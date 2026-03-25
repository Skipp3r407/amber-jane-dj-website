"use client";

import { motion } from "framer-motion";

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
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6"
    >
      <div className="text-4xl leading-none text-neon-pink/40">&ldquo;</div>
      <blockquote className="mt-2 text-sm leading-relaxed text-zinc-300">{quote}</blockquote>
      <figcaption className="mt-4 border-t border-white/10 pt-4">
        <p className="font-display text-sm text-white">{name}</p>
        <p className="text-xs text-zinc-500">{role}</p>
      </figcaption>
    </motion.figure>
  );
}
