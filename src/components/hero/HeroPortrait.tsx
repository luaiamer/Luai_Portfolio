"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";

type HeroPortraitProps = {
  reduceMotion?: boolean;
};

export default function HeroPortrait({
  reduceMotion = false,
}: HeroPortraitProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runMotion = mounted && !reduceMotion;
  const size = hero.portrait.size ?? 1;

  return (
    <motion.div
      className="relative z-[3] col-span-12 flex items-center justify-center px-6 md:col-span-6 md:px-4 xl:col-span-7 xl:px-6"
      initial={runMotion ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        runMotion
          ? { duration: 0.55, delay: 0.25, ease: "easeOut" }
          : { duration: 0 }
      }
    >
      <div
        className="absolute bottom-[12%] left-1/2 h-[50%] w-[60%] -translate-x-1/2 rounded-full bg-accent/20 blur-[90px]"
        aria-hidden
      />
      <div
        className="absolute bottom-[18%] left-[55%] h-[55%] w-[50%] rounded-full bg-accent-2/25 blur-[100px]"
        aria-hidden
      />

      <div
        className="relative mx-auto w-full"
        style={{
          height: `${80 * size}vh`,
          maxWidth: `${40 * size}rem`,
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        >
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-contain object-center"
          />
        </div>

        <div
          className="absolute right-[8%] top-[18%] rounded-full border border-accent/70 bg-bg-elevated/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent backdrop-blur-sm animate-float-badge md:right-[10%] md:top-[22%]"
          aria-hidden
        >
          ✦ {hero.badge}
        </div>
      </div>
    </motion.div>
  );
}
