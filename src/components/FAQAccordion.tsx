"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

type FAQAccordionProps = {
  items: readonly FaqItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 ease-out",
              "hover:border-neon-purple/45 hover:bg-white/[0.07]",
              "hover:shadow-[0_0_28px_rgba(123,44,255,0.14),0_0_40px_rgba(255,60,172,0.08)]",
              isOpen && "border-neon-blue/25 bg-white/[0.06] shadow-[0_0_20px_rgba(0,194,255,0.06)]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 group-hover:bg-white/[0.02]"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base text-foreground transition-colors duration-300 group-hover:text-white">
                {item.q}
              </span>
              <span
                className={cn(
                  "text-neon-blue transition-all duration-300 group-hover:text-neon-pink",
                  isOpen && "rotate-180 text-neon-blue",
                )}
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="border-t border-white/5 px-5 pb-4 pt-0 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
