"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";

type HeroActionsProps = {
  reduceMotion?: boolean;
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function HeroActions({ reduceMotion = false }: HeroActionsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runMotion = mounted && !reduceMotion;

  return (
    <motion.div
      className="relative z-[4] px-6 pb-8 pt-6 md:col-span-6 md:col-start-1 md:row-start-3 md:px-8 md:pb-0 md:pt-8 xl:col-span-5 xl:px-10"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.65,
          },
        },
      }}
      initial={runMotion ? "hidden" : false}
      animate="show"
    >
            <motion.p
        variants={item}
        transition={{ duration: 0.35 }}
        className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim"
      >
        <span
          className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"
          aria-hidden
        />
        {hero.location}
      </motion.p>


      <motion.div
        variants={item}
        transition={{ duration: 0.35 }}
        className="flex w-full flex-col gap-4 sm:flex-row sm:items-center"
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


    </motion.div>
  );
}
