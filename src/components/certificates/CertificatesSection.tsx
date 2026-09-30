"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  WorksWheel,
  type WorksWheelHandle,
} from "@/components/ui/works-wheel";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  CarouselDots,
  snapTrackClass,
  useSnapCarousel,
} from "@/components/ui/snap-carousel";
import { certificates } from "@/lib/content";

const SCROLL_PER_ITEM = 520;
const SCROLL_OPEN = 420;

/**
 * 1) Header scrolls normally
 * 2) Wheel pins centered (sticky 100vh)
 * 3) Scroll through the tall track drives the spin; then page continues
 *
 * Note: some Tailwind utilities (sticky, top-1/2) were not applying in this
 * project — critical layout uses inline styles.
 */
export default function CertificatesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<WorksWheelHandle>(null);
  const {
    trackRef: carouselRef,
    active,
    onScroll,
    scrollTo,
  } = useSnapCarousel<HTMLUListElement>();
  const itemCount = certificates.items.length;
  const trackExtra = SCROLL_OPEN + itemCount * SCROLL_PER_ITEM;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sync = () => {
      const rect = track.getBoundingClientRect();
      const maxScroll = track.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      if (rect.top > 0) {
        wheelRef.current?.setTarget(0);
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll);
      const maxTurn = wheelRef.current?.getMax() ?? itemCount;

      // Hold a clean ring, then open into the drum, then spin items.
      if (scrolled < SCROLL_OPEN) {
        wheelRef.current?.setTarget(scrolled / SCROLL_OPEN); // 0 → 1
        return;
      }

      const spinMax = Math.max(maxScroll - SCROLL_OPEN, 1);
      const spinProgress = (scrolled - SCROLL_OPEN) / spinMax;
      wheelRef.current?.setTarget(1 + spinProgress * Math.max(maxTurn - 1, 0));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [itemCount]);

  return (
    <section
      id="certificates"
      className="relative border-t border-line bg-bg"
      aria-label="Certificates"
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-16 md:px-8 md:pt-20 xl:px-10">
        <ScrollReveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {certificates.eyebrow}
        </ScrollReveal>
        <ScrollReveal
          as="h2"
          delay={0.08}
          className="max-w-2xl font-display text-3xl font-bold tracking-tight text-text md:text-4xl"
        >
          {certificates.headline}
        </ScrollReveal>
        <ScrollReveal
          as="p"
          delay={0.16}
          className="mt-4 max-w-xl pb-10 text-base text-text-muted md:text-lg"
        >
          <span className="max-lg:hidden">{certificates.description}</span>
          <span className="lg:hidden">{certificates.mobileDescription}</span>
        </ScrollReveal>
      </div>

      {/* Below lg — swipeable carousel instead of the pinned wheel */}
      <div className="px-6 pb-16 md:px-8 lg:hidden">
        <ul
          ref={carouselRef}
          onScroll={onScroll}
          aria-label="Certificates carousel"
          className={`relative flex gap-4 ${snapTrackClass}`}
        >
          {certificates.items.map((item) => (
            <li
              key={`${item.title}-${item.image}`}
              className="w-[80%] shrink-0 snap-start md:w-[45%]"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-[rgba(10,15,10,0.45)] transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="block aspect-[4/3] min-h-0 overflow-hidden bg-[#0a1a0a] p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-contain"
                  />
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                    {item.date}
                  </span>
                  <span className="mt-2 line-clamp-3 font-display text-base font-semibold leading-snug text-text">
                    {item.title}
                  </span>
                  <span className="mt-auto flex items-center gap-1 pt-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-text-dim transition-colors group-hover:text-accent">
                    View
                    <span aria-hidden>↗</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <CarouselDots
          count={itemCount}
          active={active}
          onSelect={scrollTo}
          label="certificate"
          className="mt-6"
        />
      </div>

      <div
        ref={trackRef}
        className="relative w-full max-lg:hidden"
        style={{ height: `calc(100vh + ${trackExtra}px)` }}
      >
        <div
          className="w-full overflow-hidden"
          style={
            {
              position: "sticky",
              top: 0,
              height: "100vh",
              minHeight: "100vh",
              width: "100%",
              background: "#000000",
              color: "#ffffff",
              "--background": "#000000",
              "--foreground": "#ffffff",
              "--muted": "#0a1a0a",
              "--muted-foreground": "#a1a1aa",
            } as CSSProperties
          }
        >
          <WorksWheel
            ref={wheelRef}
            items={certificates.items}
            label={certificates.wheelLabel}
            action="View"
            captureWheel={false}
            style={{
              display: "block",
              height: "100vh",
              minHeight: "100vh",
              width: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
}
