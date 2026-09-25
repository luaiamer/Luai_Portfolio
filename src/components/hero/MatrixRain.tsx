"use client";

import { useEffect, useRef } from "react";

type MatrixRainProps = {
  fontSize?: number;
  /** 0–1 how many columns rain (default 0.35) */
  density?: number;
  speed?: number;
  /** Overall canvas opacity 0–1 (default 0.32) */
  opacity?: number;
  color?: string;
  className?: string;
};

/**
 * Classic matrix rain — every active column loops forever.
 * Density only picks which columns are on; they never turn off.
 */
export default function MatrixRain({
  fontSize = 14,
  density = 0.35,
  speed = 1,
  opacity = 0.32,
  color,
  className = "",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const matrixColor =
      color ||
      getComputedStyle(document.documentElement)
        .getPropertyValue("--matrix")
        .trim() ||
      "#3FAF4A";
    const headColor = "#D9FFD0";

    let raf = 0;
    let running = true;
    let cols = 0;
    let ys: number[] = [];
    let speeds: number[] = [];
    let active: boolean[] = [];
    let lastW = 0;
    let lastH = 0;
    let dpr = 1;

    const setup = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      // Skip no-op resizes (avoids wiping the rain)
      if (w === lastW && h === lastH && ys.length > 0) return;
      lastW = w;
      lastH = h;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(1, Math.floor(w / fontSize));
      const clampedDensity = Math.min(1, Math.max(0.05, density));
      // Stride so ~density fraction of columns are always on
      const stride = Math.max(1, Math.round(1 / clampedDensity));

      ys = new Array(cols);
      speeds = new Array(cols);
      active = new Array(cols);

      for (let i = 0; i < cols; i++) {
        active[i] = i % stride === 0;
        // Start scattered so first frame already looks full
        ys[i] = Math.random() * (h / fontSize);
        speeds[i] = (0.35 + Math.random() * 0.55) * speed;
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      if (prefersReduced) {
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < cols; i++) {
          if (!active[i]) continue;
          for (let n = 0; n < 5; n++) {
            ctx.globalAlpha = 0.2 + Math.random() * 0.5;
            ctx.fillStyle = matrixColor;
            ctx.fillText(
              Math.random() > 0.5 ? "1" : "0",
              i * fontSize,
              Math.floor(Math.random() * (h / fontSize)) * fontSize
            );
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    const draw = () => {
      const w = lastW;
      const h = lastH;
      if (w < 1 || h < 1) return;

      // Trail fade — keep light so streams stay visible
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < cols; i++) {
        if (!active[i]) continue;

        const x = i * fontSize;
        const y = ys[i] * fontSize;
        const bit = (i + Math.floor(ys[i])) % 2 === 0 ? "0" : "1";

        // Head
        ctx.fillStyle = headColor;
        ctx.globalAlpha = 1;
        ctx.fillText(bit, x, y);

        // Short bright trail
        ctx.fillStyle = matrixColor;
        ctx.globalAlpha = 0.7;
        ctx.fillText(bit === "0" ? "1" : "0", x, y - fontSize);
        ctx.globalAlpha = 0.35;
        ctx.fillText(bit, x, y - fontSize * 2);
        ctx.globalAlpha = 1;

        ys[i] += speeds[i];

        // Forever loop — reset ABOVE the top, never deactivate
        if (y > h) {
          ys[i] = 0;
          speeds[i] = (0.35 + Math.random() * 0.55) * speed;
        }
      }
    };

    const tick = () => {
      if (!running) return;
      if (!prefersReduced && !document.hidden) {
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    setup();

    const ro = new ResizeObserver(() => {
      setup();
    });
    ro.observe(container);

    const onVis = () => {
      // no-op: tick keeps running; draw skips while hidden
    };
    document.addEventListener("visibilitychange", onVis);

    if (!prefersReduced) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fontSize, density, speed, color]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
