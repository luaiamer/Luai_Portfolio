"use client";

import { useEffect, useState } from "react";
import { hero, matrix } from "@/lib/content";
import MatrixRain from "./MatrixRain";
import GridOverlay from "./GridOverlay";
import HeroIntro from "./HeroIntro";
import HeroPortrait from "./HeroPortrait";
import HeroMetrics from "./HeroMetrics";

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mqMotion.matches);
    sync();
    mqMotion.addEventListener("change", sync);
    return () => mqMotion.removeEventListener("change", sync);
  }, []);

  const scrollNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0">
        <MatrixRain
          speed={matrix.speed}
          density={matrix.density}
          opacity={matrix.opacity}
        />
      </div>

      <GridOverlay />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
      >
        <div className="absolute -bottom-24 -left-24 h-[50vh] w-[50vw] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute bottom-[10%] left-1/2 h-[40vh] w-[40vw] -translate-x-1/2 rounded-full bg-accent-2/10 blur-[100px]" />
      </div>

      <div className="relative z-[3] mx-auto grid min-h-screen max-w-[1440px] grid-cols-12 items-center">
        <HeroIntro reduceMotion={reduceMotion} />
        <HeroPortrait reduceMotion={reduceMotion} />
        {/* <HeroMetrics reduceMotion={reduceMotion} /> */}
      </div>

      <button
        type="button"
        onClick={scrollNext}
        className="absolute bottom-8 left-6 z-[4] flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:left-8 xl:left-10"
      >
        <span className="inline-block h-px w-8 bg-current" aria-hidden />
        {hero.scrollHint}
      </button>
    </section>
  );
}
