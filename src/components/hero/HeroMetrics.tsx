"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hero, metrics } from "@/lib/content";
import CountUp from "./CountUp";

type HeroMetricsProps = {
  reduceMotion?: boolean;
};

const colorClass = {
  accent: "text-accent",
  white: "text-text",
  cyan: "text-accent-2",
} as const;

export default function HeroMetrics({
  reduceMotion = false,
}: HeroMetricsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runMotion = mounted && !reduceMotion;

  return (
    <motion.div
      className="relative z-[4] col-span-12 flex flex-col justify-center px-6 pb-20 pt-4 md:px-8 md:pb-24 xl:col-span-3 xl:col-start-10 xl:items-end xl:pb-0 xl:pt-0 xl:px-10"
      initial={runMotion ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        runMotion
          ? { duration: 0.45, delay: 0.55 }
          : { duration: 0 }
      }
    >
      <p className="mb-10 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted xl:flex">
        {hero.engagementStatus}
        <span
          className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"
          aria-hidden
        />
      </p>

      <ul className="grid w-full grid-cols-3 gap-4 xl:flex xl:w-auto xl:flex-col xl:gap-20 xl:text-right">
        {metrics.map((m) => (
          <li key={m.label} className="min-w-0">
            <CountUp
              value={m.value}
              suffix={m.suffix}
              className={`block font-display text-3xl font-bold leading-none tracking-[-0.02em] md:text-5xl xl:text-6xl ${colorClass[m.color]}`}
            />
            <span className="mt-2 block font-mono text-[10px] uppercase leading-snug tracking-[0.15em] text-text-muted md:text-[11px]">
              {m.label}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
