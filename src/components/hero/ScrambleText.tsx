"use client";

import { useEffect, useState } from "react";

const CHARSET = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type ScrambleTextProps = {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: "span" | "div";
};

export default function ScrambleText({
  text,
  className = "",
  duration = 600,
  delay = 0,
  as: Tag = "span",
}: ScrambleTextProps) {
  const [output, setOutput] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setOutput(text);
      setDone(true);
      return;
    }

    let raf = 0;
    let start = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const run = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const reveal = Math.floor(progress * text.length);

      let next = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          next += " ";
        } else if (i < reveal) {
          next += text[i];
        } else {
          next += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
      }
      setOutput(next);

      if (progress < 1) {
        raf = requestAnimationFrame(run);
      } else {
        setOutput(text);
        setDone(true);
      }
    };

    timeout = setTimeout(() => {
      raf = requestAnimationFrame(run);
    }, delay);

    return () => {
      if (timeout) clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, duration, delay]);

  return (
    <Tag className={className} data-scrambled={done ? "false" : "true"}>
      {output}
    </Tag>
  );
}
