"use client";

import { motion } from "framer-motion";
import type { EventTag } from "@/data/eventsCalendar";

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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink/80"
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
          <h3 className="font-display text-base text-foreground">{title}</h3>
          <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-400">
            {date}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{location}</p>
        <p className="mt-3 text-sm text-neon-blue">{highlight}</p>
      </div>
    </motion.article>
  );
}
