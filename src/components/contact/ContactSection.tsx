"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { contact } from "@/lib/content";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type SocialIconId = (typeof contact.socials)[number]["icon"];

function SocialIcon({ id }: { id: SocialIconId }) {
  const common = {
    viewBox: "0 0 24 24",
    className:
      "size-[22px] shrink-0 opacity-80 transition duration-300 group-hover:scale-110 group-hover:opacity-100",
    style: { fill: "#ffffff" },
    "aria-hidden": true as const,
  };

  switch (id) {
    case "github":
      return (
        <svg {...common}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.77-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M24 12.07C24 5.42 18.63.05 12 .05S0 5.42 0 12.07c0 6 4.39 10.98 10.13 11.88v-8.41H7.08v-3.47h3.04V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.96h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.47h-2.8v8.41C19.61 23.05 24 18.07 24 12.07Z" />
        </svg>
      );
  }
}

function SocialRow({
  item,
  index,
}: {
  item: (typeof contact.socials)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(198, 244, 50, 0.12), transparent 55%)`;

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden border-t border-line last:border-b"
      style={{ borderColor: "var(--line)" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-accent/15 transition-[width] duration-300 ease-out group-hover:w-full"
        aria-hidden
      />
      <div
        className="relative flex items-center gap-4 px-1 py-6 text-text md:gap-8 md:py-8"
        style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem" }}
      >
        <span className="w-10 shrink-0 font-mono text-xs tracking-[0.2em] text-text-dim transition-colors group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>

        <SocialIcon id={item.icon} />

        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold tracking-tight text-text transition-colors duration-300 group-hover:text-accent md:text-2xl lg:text-3xl">
            {item.name}
          </p>
          <p className="mt-1 font-mono text-xs tracking-wide text-text-muted md:text-sm">
            {item.handle}
          </p>
        </div>

        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            border: "1px solid var(--line)",
            borderRadius: "9999px",
          }}
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
            <path
              d="M3 13 13 3M5.5 3H13v7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line bg-bg"
      aria-label="Contact"
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(198, 244, 50, 0.07), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 size-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24 xl:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24">
          {/* Left copy + CTA */}
          <div className="flex flex-col justify-between gap-10">
            <div>
              <ScrollReveal
                as="p"
                className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                {contact.eyebrow}
              </ScrollReveal>
              <ScrollReveal
                as="h2"
                delay={0.08}
                className="max-w-lg font-display text-4xl font-bold leading-[1.05] tracking-tight text-text md:text-5xl lg:text-[3.25rem]"
              >
                {contact.headline}
              </ScrollReveal>
              <ScrollReveal
                as="p"
                delay={0.16}
                className="mt-6 max-w-md text-base leading-relaxed text-text-muted md:text-lg"
                style={{ textAlign: "justify", textJustify: "inter-word" }}
              >
                {contact.description}
              </ScrollReveal>
            </div>

            <div>
              {/* <a
                href={contact.cta.href}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-display text-sm font-semibold tracking-wide text-bg transition hover:brightness-110"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 28px var(--accent-glow)",
                  borderRadius: "9999px",
                }}
              >
                {contact.cta.label}
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path
                    d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a> */}
              <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-dim">
                {contact.footnote}
              </p>
            </div>
          </div>

          {/* Socials */}
          <nav aria-label="Social links" className="min-w-0">
            <ul className="list-none p-0">
              {contact.socials.map((item, index) => (
                <li key={item.name}>
                  <SocialRow item={item} index={index} />
                </li>
              ))}
            </ul>

            <a
              href={contact.email.href}
              className="mt-8 flex items-center justify-between gap-4 border border-line px-5 py-4 transition hover:border-accent/50"
              style={{
                borderRadius: "0.75rem",
                border: "1px solid var(--line)",
                background: "rgba(10, 15, 10, 0.45)",
              }}
            >
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-dim">
                  Email
                </p>
                <p className="mt-1 font-display text-base text-text md:text-lg">
                  {contact.email.label}
                </p>
              </div>
              <span className="font-mono text-xs text-accent">mailto →</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
