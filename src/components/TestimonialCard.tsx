"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6",
        "transition-all duration-300 ease-out",
        "hover:border-neon-pink/45 hover:bg-gradient-to-br hover:from-neon-pink/[0.08] hover:to-neon-purple/[0.06]",
        "hover:shadow-[0_0_32px_rgba(255,60,172,0.16),0_0_40px_rgba(123,44,255,0.1)] hover:ring-1 hover:ring-neon-pink/25",
      )}
    >
      <div className="text-4xl leading-none text-neon-pink/40 transition-colors duration-300 group-hover:text-neon-pink/70">
        &ldquo;
      </div>
      <blockquote className="mt-2 text-sm leading-relaxed text-zinc-300 transition-colors duration-300 group-hover:text-zinc-200">
        {quote}
      </blockquote>
      <figcaption className="mt-4 border-t border-white/10 pt-4 transition-colors duration-300 group-hover:border-white/15">
        <p className="font-display text-sm text-white">{name}</p>
        <p className="text-xs text-zinc-500 transition-colors group-hover:text-zinc-400">{role}</p>
      </figcaption>
    </motion.figure>
  );
}
