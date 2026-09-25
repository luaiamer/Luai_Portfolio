"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { boot } from "@/lib/content";

const SESSION_KEY = "luai-boot-done";

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "cmd"; text: string }
  | { kind: "ok"; text: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(q.matches);
    read();
    q.addEventListener("change", read);
    return () => q.removeEventListener("change", read);
  }, []);
  return reduced;
}

/**
 * Full-screen terminal boot sequence on first open (per tab session).
 */
export default function BootLoader({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [progress, setProgress] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setShow(false);
        setReady(true);
        return;
      }
    } catch {
      /* private mode */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !show) return;

    if (reduced) {
      setProgress(100);
      const t = window.setTimeout(() => finish(), 400);
      return () => window.clearTimeout(t);
    }

    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    let elapsed = 0;
    const push = (line: Line, wait: number) => {
      elapsed += wait;
      schedule(() => setLines((prev) => [...prev, line]), elapsed);
    };

    push({ kind: "prompt", text: boot.prompt }, 200);
    push({ kind: "cmd", text: boot.commands[0] }, 500);
    push({ kind: "ok", text: boot.responses[0] }, 700);
    push({ kind: "cmd", text: boot.commands[1] }, 600);
    push({ kind: "ok", text: boot.responses[1] }, 650);

    elapsed += 400;
    schedule(() => setShowBar(true), elapsed);

    // Progress 0 → 100
    const barStart = elapsed + 100;
    const duration = boot.barDurationMs;
    schedule(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setProgress(Math.round(eased * 100));
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          schedule(() => finish(), 350);
        }
      };
      requestAnimationFrame(tick);
    }, barStart);

    return () => timers.forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, show, reduced]);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  const finish = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!ready) {
    return (
      <div
        className="fixed inset-0 bg-bg"
        style={{ zIndex: 100 }}
        aria-hidden
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        {show ? (
          <motion.div
            key="boot"
            className="fixed inset-0 flex items-center justify-center bg-bg"
            style={{ zIndex: 100 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            aria-label="Loading"
          >
            <div className="w-full max-w-md px-6 font-mono">
              <div
                className="space-y-1 text-sm md:text-[0.95rem]"
                style={{ minHeight: "7.5rem" }}
              >
                {lines.map((line, i) => (
                  <motion.p
                    key={`${line.kind}-${i}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={
                      line.kind === "ok" ? "text-text-muted" : "text-accent"
                    }
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>

              {showBar ? (
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-full overflow-hidden rounded-full"
                    style={{
                      height: 3,
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background:
                          "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)",
                        boxShadow: "0 0 16px var(--accent-glow)",
                        transition: "width 40ms linear",
                      }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.22em] text-text-dim">
                    <span>{boot.barLabel}</span>
                    <span>{progress}%</span>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}
