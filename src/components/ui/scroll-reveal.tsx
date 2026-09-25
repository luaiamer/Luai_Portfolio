"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type RevealTag = "div" | "p" | "h2" | "h3" | "span" | "ul" | "li";

type ScrollRevealProps = {
  as?: RevealTag;
  delay?: number;
  className?: string;
  children: ReactNode;
} & Omit<HTMLMotionProps<"div">, "children" | "as">;

/**
 * Replayable enter/exit reveal — animates in when scrolled into view,
 * reverses when scrolled out so scrolling back plays it again.
 */
export function ScrollReveal({
  as = "div",
  delay = 0,
  className,
  children,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.4,
    margin: "0px 0px -10% 0px",
  });

  const Comp = motion[as] as ElementType;

  return (
    <Comp
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.55,
        delay: inView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
