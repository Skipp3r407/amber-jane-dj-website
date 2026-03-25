"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RevealVariant } from "@/lib/revealVariants";

export type { RevealVariant } from "@/lib/revealVariants";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Scroll reveal direction */
  variant?: RevealVariant;
  /** Use `li` when wrapping list items for valid markup */
  as?: "div" | "li";
};

const initial: Record<RevealVariant, { opacity: number; x?: number; y?: number }> = {
  up: { opacity: 0, y: 28 },
  down: { opacity: 0, y: -28 },
  left: { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
};

const animate: Record<RevealVariant, { opacity: number; x?: number; y?: number }> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
};

export function SectionReveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as = "div",
}: SectionRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as === "li" ? "li" : "div";
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial={initial[variant]}
      whileInView={animate[variant]}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
