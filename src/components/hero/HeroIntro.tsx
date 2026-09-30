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
      className="relative z-[4] flex flex-col px-6 pt-24 md:col-span-6 md:col-start-1 md:row-start-2 md:px-8 md:pt-0 xl:col-span-5 xl:px-10"
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
    </motion.div>
  );
}
