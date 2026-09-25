"use client"

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react"

import { cn } from "@/lib/utils"

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string
  /** Cover art. Any src an <img> takes. */
  image: string
  /** Optional date shown under the front-card title. */
  date?: string
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[]
  /** Sits in the middle of the ring. @default undefined */
  label?: string
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string
  /**
   * When false, page/parent owns the scroll — wheel won't capture wheel events.
   * Drive position via the imperative handle instead. @default true
   */
  captureWheel?: boolean
}

export type WorksWheelHandle = {
  /** Jump / ease toward a turn value (0 = ring, 1..n = drum items). */
  setTarget: (value: number) => void
  getTarget: () => number
  /** Max turn = lastIndex + 1 */
  getMax: () => number
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.26 // front card height, of the stage
const CARD_MAX_W = 0.28 // ... but never wider than this much of the stage
const CARD_RATIO = 1.35 // card width / height — closer to landscape certs
const STEP = 40 // degrees between cards on the drum
const DRUM = 2.05 // drum radius, in card heights - and everything below likewise
const LENS = 2.7 // perspective distance
const RING_R = 1.35 // preferred ring radius (in card heights)
/** How much of each arc slot a ring card may fill. Lower = clearer gaps. */
const RING_PACK = 0.5
/** Inset from stage edges so the ring never clips. */
const RING_INSET = 28
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.82
const TITLE = 0.124 // ring label and front-card title
const INDEX = 0.04 // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900
const DRAG_UNITS = 420
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.08

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

type Stage = { w: number; h: number }

const rad = (deg: number) => (deg * Math.PI) / 180

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)))

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  )
}

export const WorksWheel = React.forwardRef<WorksWheelHandle, WorksWheelProps>(
  function WorksWheel(
    {
      items,
      label = "Works '26",
      action = "View",
      className,
      captureWheel = true,
      ...props
    },
    ref
  ) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const wheelRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLElement | null)[]>([])
  const labelRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = React.useRef(0)
  const target = React.useRef(0)
  const [active, setActive] = React.useState(0)
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 })

  const count = items.length
  const last = Math.max(count - 1, 0)

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener("change", read)
    return () => query.removeEventListener("change", read)
  }, [])

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const metrics = React.useMemo(() => {
    const { w, h } = stage
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W)
    const cardH = cardW / CARD_RATIO
    const drumR = cardH * DRUM

    // Prefer RING_R, but shrink the orbit so scaled cards stay inside the stage.
    let ringR = cardH * RING_R
    let ringScale = count
      ? clamp(
          (((2 * Math.PI * ringR) / count) * RING_PACK) / (cardW || 1),
          0.18,
          0.85
        )
      : 1
    if (w > 0 && h > 0) {
      const visualHalf =
        0.5 * Math.hypot(cardW * ringScale, cardH * ringScale)
      const maxR = Math.min(w, h) / 2 - visualHalf - RING_INSET
      if (maxR > 0 && ringR > maxR) {
        ringR = maxR
        ringScale = count
          ? clamp(
              (((2 * Math.PI * ringR) / count) * RING_PACK) / (cardW || 1),
              0.16,
              0.85
            )
          : 1
      }
    }

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    }
  }, [stage, count])

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return
    let frame = 0
    const { ringR, ringScale, drumR, bow } = metrics

    const draw = () => {
      frame = requestAnimationFrame(draw)
      const gap = target.current - turn.current
      if (Math.abs(gap) < 0.0005) turn.current = target.current
      else turn.current += gap * (reduced ? 1 : EASE)

      const t = turn.current
      const m = clamp(t, 0, 1)
      const pos = Math.max(0, t - 1)

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos
        const drumDeg = d * STEP
        const ringDeg = d * (360 / count)
        const card = cardRefs.current[i]
        if (card) {
          // Scale is applied first (rightmost) so orbit radius stays true while
          // ring cards shrink into evenly spaced slots around the circle.
          const scale = lerp(ringScale, 1, m)
          card.style.transform =
            place(ringDeg, drumDeg, ringR, drumR, bow, m) + ` scale(${scale})`

          // Depth along the view axis (front = high). Manual |d| z-index fights
          // preserve-3d and lets cards paint through each other mid-turn.
          const depth = lerp(
            Math.cos(rad(ringDeg)),
            Math.cos(rad(drumDeg)),
            m
          )
          card.style.zIndex = String(Math.round(200 + depth * 100))

          // Soft fade as cards leave the front — ease out instead of hard cull.
          const dist = Math.abs(d)
          let opacity = 1
          if (m > 0.35) {
            const fadeStart = 0.65
            const fadeEnd = CULL + 0.85
            const t = clamp((dist - fadeStart) / (fadeEnd - fadeStart), 0, 1)
            // Smoothstep: stays solid near the front, then eases to transparent.
            opacity = 1 - t * t * (3 - 2 * t)
          }
          card.style.opacity = String(opacity)
          card.style.pointerEvents =
            opacity < 0.12 || dist > 0.55 ? "none" : "auto"
        }
        const face = card?.firstElementChild as HTMLElement | null
        if (face) face.style.transform = ""
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)
      const near = clamp(Math.round(pos), 0, last)
      setActive((prev) => (prev === near ? prev : near))
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [metrics, stage.h, count, last, reduced])

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1)
    },
    [last]
  )

  React.useImperativeHandle(
    ref,
    () => ({
      setTarget: to,
      getTarget: () => target.current,
      getMax: () => last + 1,
    }),
    [to, last]
  )

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  React.useEffect(() => {
    if (!captureWheel) return
    const el = stageRef.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS
      if (next > 0 && next < last + 1) event.preventDefault()
      to(next)
      // A wheel gesture arrives as a burst of events with no end of its own, so
      // the rest position is whatever notch it happened to stop on. Left there
      // the drum sits between two cards - nothing at the front, and the pair
      // either side of the gap both turned half away. Settle onto an item.
      window.clearTimeout(settling.current)
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE
      )
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onWheel)
      window.clearTimeout(settling.current)
    }
  }, [to, last, captureWheel])

  const drag = React.useRef<{
    y: number
    moved: boolean
    pointerId: number
  } | null>(null)
  const settling = React.useRef(0)
  const DRAG_THRESHOLD = 8

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          // Don't capture yet — capturing immediately steals clicks from <a> cards.
          drag.current = {
            y: event.clientY,
            moved: false,
            pointerId: event.pointerId,
          }
        }}
        onPointerMove={(event) => {
          const state = drag.current
          if (!state || event.pointerId !== state.pointerId) return
          const dy = event.clientY - state.y
          if (!state.moved) {
            if (Math.abs(dy) < DRAG_THRESHOLD) return
            state.moved = true
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          to(target.current + (state.y - event.clientY) / DRAG_UNITS)
          state.y = event.clientY
        }}
        onPointerUp={(event) => {
          const state = drag.current
          drag.current = null
          if (state?.moved) {
            if (target.current > 1) to(Math.round(target.current))
            return
          }
          // Tap with no drag — open the active card (drum only).
          if (target.current < 0.85) return
          const front = items[active]
          if (!front?.href) return
          if (front.href.startsWith("http")) {
            window.open(front.href, "_blank", "noopener,noreferrer")
          } else {
            window.location.assign(front.href)
          }
        }}
        onPointerCancel={() => {
          drag.current = null
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1)
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1)
          else if (event.key === "Enter" || event.key === " ") {
            const front = items[active]
            if (!front?.href) return
            event.preventDefault()
            if (front.href.startsWith("http")) {
              window.open(front.href, "_blank", "noopener,noreferrer")
            } else {
              window.location.assign(front.href)
            }
            return
          } else return
          event.preventDefault()
        }}
      >
        <div
          ref={wheelRef}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a"
            return (
              <React.Fragment key={`${item.title}-${item.image}-${i}`}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  {...(item.href?.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                    transition: reduced
                      ? undefined
                      : "opacity 0.35s ease-out",
                    cursor: item.href ? "pointer" : undefined,
                  }}
                  onClick={(event) => {
                    // Navigation is handled on stage pointer-up (tap vs drag).
                    event.preventDefault()
                  }}
                >
                  <span
                    className="relative block size-full overflow-hidden rounded-lg"
                    style={{
                      background: "#0a1a0a",
                      boxShadow: "0 18px 40px -18px rgba(0,0,0,0.65)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                    {action && item.href ? (
                      <span className="bg-background/80 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition.
          Type is sized off the measured stage, not vh, so the wheel keeps its
          proportions inside a card as well as at full bleed. */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="pointer-events-none absolute opacity-0"
        style={{
          top: "50%",
          left: "6%",
          transform: "translateY(-50%)",
          // Keep clear of the centered front card (~24% wide).
          width: "min(40rem, 100%)",
          maxWidth: "100%",
        }}
      >
        <p
          className="font-sans text-base leading-snug text-foreground md:text-lg"
          style={{ whiteSpace: "pre-line" }}
        >
          {items[active]?.title}
        </p>
        {items[active]?.date ? (
          <p className="mt-2 font-sans text-sm text-muted-foreground md:text-base">
            {items[active]?.date}
          </p>
        ) : null}
      </div>

      {/* <ol
        className="text-muted-foreground absolute text-right leading-[1.75]"
        style={{
          fontSize: Math.max(metrics.index, 12),
          top: "7.5%",
          right: "2.5%",
        }}
      >
        {items.map((item, i) => (
          <li key={`${item.title}-${i}`}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "focus-visible:outline-foreground cursor-pointer transition-colors outline-none focus-visible:outline-1",
                i === active && "text-foreground font-medium"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol> */}
    </section>
  )
})

WorksWheel.displayName = "WorksWheel"

export default WorksWheel

