"use client";

import type { CSSProperties } from "react";
import { projects } from "@/lib/content";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  CarouselDots,
  snapTrackClass,
  useSnapCarousel,
} from "@/components/ui/snap-carousel";

const accentClass = {
  accent: "text-accent",
  cyan: "text-accent-2",
} as const;

/**
 * Two-column projects: sticky intro on the left, scrolling cards on the right.
 * Below lg the cards become a horizontal snap carousel instead.
 * Sticky uses inline styles — Tailwind sticky utilities are unreliable here.
 */
export default function ProjectsSection() {
  const { trackRef, active, onScroll, scrollTo } =
    useSnapCarousel<HTMLUListElement>();

  return (
    <section
      id="work"
      className="relative border-t border-line bg-bg"
      aria-label="Projects"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-16 md:gap-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-20 xl:px-10">
        {/* Left — sticky title block */}
        <div
          className="self-start max-lg:static!"
          style={
            {
              position: "sticky",
              top: "6.5rem",
            } as CSSProperties
          }
        >
          <ScrollReveal
            as="p"
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            {projects.eyebrow}
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.08}
            className="max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl lg:text-[2.75rem]"
          >
            {projects.headline}
          </ScrollReveal>
          <ScrollReveal
            as="p"
            delay={0.16}
            className="mt-6 text-base leading-relaxed text-text-muted md:text-lg"
            style={{
              width: "100%",
              textAlign: "justify",
              textJustify: "inter-word",
              hyphens: "auto",
              textAlignLast: "left",
            }}
          >
            {projects.description}
          </ScrollReveal>
        </div>

        {/* Right — scrolling project list */}
        <div className="relative min-w-0">
          {/* Timeline rail */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 w-px bg-line max-lg:hidden"
            style={{ left: "1.15rem" }}
          />

          <ul
            ref={trackRef}
            onScroll={onScroll}
            aria-label="Projects carousel"
            className={`relative flex gap-4 lg:flex-col lg:gap-6 ${snapTrackClass}`}
          >
            {projects.items.map((item, index) => (
              <li
                key={item.number}
                className="relative max-lg:w-[85%] max-lg:shrink-0 max-lg:snap-start md:max-lg:w-[70%] lg:pl-10"
              >
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute top-8 left-[1.15rem] z-10 size-2.5 -translate-x-1/2 rounded-full bg-accent max-lg:hidden"
                  style={{
                    boxShadow: "0 0 12px var(--accent-glow)",
                    opacity:
                      index === 0 || index === projects.items.length - 1
                        ? 1
                        : 0.55,
                  }}
                />

                <article
                  className="max-lg:h-full max-lg:p-5!"
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid var(--line)",
                    background: "rgba(10, 15, 10, 0.45)",
                    padding: "1.75rem 2rem",
                  }}
                >
                  <p
                    className={`font-mono text-[0.7rem] uppercase tracking-[0.18em] ${accentClass[item.accent]}`}
                  >
                    {item.number}
                    <span className="mx-2 text-text-dim">·</span>
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-text md:text-2xl">
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-text-muted md:text-base"
                    style={{
                      maxWidth: "36rem",
                      width: "100%",
                      textAlign: "justify",
                      textJustify: "inter-word",
                      hyphens: "auto",
                    }}
                  >
                    {item.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <CarouselDots
            count={projects.items.length}
            active={active}
            onSelect={scrollTo}
            label="project"
            className="mt-6 lg:hidden"
          />
        </div>
      </div>
    </section>
  );
}
