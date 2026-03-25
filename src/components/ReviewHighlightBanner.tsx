"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";

export function ReviewHighlightBanner() {
  const items = [
    "Crowd locked in all night",
    "Smooth transitions",
    "Pro on and off stage",
    "Would book again",
  ];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-night">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(123,44,255,0.4), transparent)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:flex-wrap sm:justify-between sm:px-6">
        <SectionReveal variant="left" className="w-full text-center sm:max-w-md sm:flex-1 sm:text-left">
          <p className="text-sm font-medium text-zinc-400">
            Trusted by hosts, venues, and planners who want energy{" "}
            <span className="text-foreground">without</span> the chaos.
          </p>
        </SectionReveal>
        <SectionReveal variant="right" delay={0.06} className="flex w-full flex-wrap justify-center gap-2 sm:w-auto sm:justify-end">
          {items.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300"
            >
              {t}
            </span>
          ))}
        </SectionReveal>
        <SectionReveal variant="down" delay={0.1} className="w-full text-center sm:w-auto sm:text-right">
          <Link
            href="/testimonials"
            className="text-sm font-semibold text-neon-blue hover:underline"
          >
            Read reviews
          </Link>
        </SectionReveal>
      </div>
    </div>
  );
}
