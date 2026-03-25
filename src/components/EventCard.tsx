"use client";

import { motion } from "framer-motion";
import type { EventTag } from "@/data/eventsCalendar";
import { cn } from "@/lib/utils";

type EventCardProps = {
  title: string;
  location: string;
  date: string;
  highlight: string;
  tags?: EventTag[];
};

export function EventCard({ title, location, date, highlight, tags }: EventCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-ink/80",
        "transition-all duration-300 ease-out",
        "hover:border-neon-pink/45 hover:bg-gradient-to-br hover:from-neon-pink/[0.07] hover:to-neon-purple/[0.06]",
        "hover:shadow-[0_0_32px_rgba(255,60,172,0.16),0_0_40px_rgba(123,44,255,0.1)] hover:ring-1 hover:ring-neon-pink/25",
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-pink/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="p-5">
        {tags && tags.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-soft/90"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-base text-foreground transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>
          <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-400 transition-colors group-hover:bg-white/10 group-hover:text-zinc-300">
            {date}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted transition-colors duration-300 group-hover:text-zinc-300">
          {location}
        </p>
        <p
          className={cn(
            "mt-3 text-sm text-neon-blue transition-all duration-300",
            "group-hover:bg-gradient-to-r group-hover:from-neon-pink group-hover:via-neon-purple group-hover:to-neon-blue group-hover:bg-clip-text group-hover:text-transparent",
          )}
        >
          {highlight}
        </p>
      </div>
    </motion.article>
  );
}
