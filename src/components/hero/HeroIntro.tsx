"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import ScrambleText from "./ScrambleText";

type HeroIntroProps = {
  reduceMotion?: boolean;
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function HeroIntro({ reduceMotion = false }: HeroIntroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runMotion = mounted && !reduceMotion;

  return (
    <motion.div
      className="relative z-[4] col-span-12 flex flex-col justify-center px-6 pt-24 md:col-span-6 md:px-8 md:pt-0 xl:col-span-5 xl:px-10"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.35,
          },
        },
      }}
      initial={runMotion ? "hidden" : false}
      animate="show"
    >
      <motion.p
        variants={item}
        transition={{ duration: 0.35 }}
        className="mb-2 origin-left -rotate-[4deg] font-hand text-3xl font-semibold text-accent md:text-4xl"
      >
        {hero.greeting}
      </motion.p>

      <motion.h1
        variants={item}
        transition={{ duration: 0.4 }}
        className="font-display text-[3.5rem] font-bold leading-[0.95] tracking-[-0.02em] md:text-6xl xl:text-[6.5rem]"
      >
        <span className="block text-text">
          {runMotion ? (
            <ScrambleText text={hero.firstName} delay={400} />
          ) : (
            hero.firstName
          )}
        </span>
        <span className="block text-accent">
          {runMotion ? (
            <ScrambleText text={hero.lastName} delay={520} />
          ) : (
            hero.lastName
          )}
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        transition={{ duration: 0.35 }}
        className="mt-5 font-display text-base font-bold uppercase leading-snug tracking-wide text-accent md:text-xl"
      >
        {hero.subtitle.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.p>

      <motion.p
        variants={item}
        transition={{ duration: 0.35 }}
        className="mt-5 text-justify text-base leading-relaxed text-text-muted md:text-lg"
      >
        {hero.description}
      </motion.p>

      <motion.div
        variants={item}
        transition={{ duration: 0.35 }}
        className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:items-center"
      >
        <a
          href={hero.primaryCta.href}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_30px_var(--accent-glow)] transition-[box-shadow,transform] hover:shadow-[0_0_45px_var(--accent-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {hero.primaryCta.label}
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
        <a
          href={hero.secondaryCta.href}
          download
          className="inline-flex items-center justify-center rounded-full border border-line bg-bg-elevated px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {hero.secondaryCta.label}
        </a>
      </motion.div>

      <motion.p
        variants={item}
        transition={{ duration: 0.35 }}
        className="mt-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim"
      >
        <span
          className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"
          aria-hidden
        />
        {hero.location}
      </motion.p>
    </motion.div>
  );
}
