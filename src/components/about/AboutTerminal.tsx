"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { about } from "@/lib/content";

function TerminalSequence() {
  const t = about.terminal;

  return (
    <Terminal
      title={t.title}
      className="max-h-none w-full max-w-none border-line bg-[#050805]"
    >
      <TypingAnimation className="text-accent" duration={40}>
        {`$ whoami`}
      </TypingAnimation>
      <AnimatedSpan className="text-text">{t.whoami}</AnimatedSpan>

      <TypingAnimation className="text-accent" duration={40}>
        {`$ cat ./profile.txt`}
      </TypingAnimation>
      <AnimatedSpan className="text-text-muted">{`role: ${t.role}`}</AnimatedSpan>
      <AnimatedSpan className="text-text-muted">
        {`experience: ${t.experience}`}
      </AnimatedSpan>
      <AnimatedSpan className="text-text-muted">
        {`engagements: ${t.engagements}`}
      </AnimatedSpan>
      <AnimatedSpan className="text-text-muted">{`certs: ${t.certs}`}</AnimatedSpan>

      <TypingAnimation className="text-accent" duration={40}>
        {`$ ./status --breaches`}
      </TypingAnimation>
      {t.statusLines.map((line) => (
        <AnimatedSpan key={line} className="text-accent-2">
          {`> ${line}`}
        </AnimatedSpan>
      ))}
    </Terminal>
  );
}

/**
 * Remounts the terminal whenever it re-enters the viewport so the typing
 * sequence plays again on scroll up or down.
 */
export default function AboutTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const wasInView = useRef(false);
  const hasEntered = useRef(false);
  const [playId, setPlayId] = useState(0);

  useEffect(() => {
    if (inView) {
      if (hasEntered.current && !wasInView.current) {
        setPlayId((id) => id + 1);
      }
      hasEntered.current = true;
      wasInView.current = true;
    } else {
      wasInView.current = false;
    }
  }, [inView]);

  return (
    <div ref={ref} className="min-w-0">
      <TerminalSequence key={playId} />
    </div>
  );
}
