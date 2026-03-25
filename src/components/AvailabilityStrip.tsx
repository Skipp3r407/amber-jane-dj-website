"use client";

import Link from "next/link";
import type { CalendarEvent } from "@/data/eventsCalendar";
import { SectionReveal } from "@/components/SectionReveal";
import { HeadlineTitle } from "@/components/HeadlineTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";

type AvailabilityStripProps = {
  events: CalendarEvent[];
};

/** Matches SiteMusicShell main padding so full-bleed aligns with viewport; inner text aligns with other sections. */
const bleed =
  "-ml-[4.25rem] w-[calc(100%+4.25rem)] sm:-ml-24 sm:w-[calc(100%+6rem)] md:-ml-28 md:w-[calc(100%+7rem)]";

const innerAlign =
  "mx-auto max-w-6xl py-10 pr-4 pl-[calc(4.25rem+1rem)] sm:pr-6 sm:pl-[calc(6rem+1.5rem)] md:pl-[calc(7rem+1.5rem)]";

export function AvailabilityStrip({ events }: AvailabilityStripProps) {
  if (events.length === 0) return null;

  return (
    <section className={`relative border-y border-white/10 bg-midnight/45 ${bleed}`}>
      <div className={innerAlign}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionReveal variant="left" className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">
              Availability & upcoming
            </p>
            <HeadlineTitle as="h2" size="subsection" title="On the" titleGradient="calendar" className="mt-2" />
            <p className="mt-3 max-w-xl text-base text-muted">
              Dates move fast — inquire early for peak weekends and festival season.
            </p>
          </SectionReveal>
          <SectionReveal variant="right" delay={0.05} className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex w-fit rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 text-sm font-semibold text-white shadow-neon transition hover:brightness-110"
            >
              Want Amber Jane at your event? Inquire now
            </Link>
          </SectionReveal>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {events.map((e, i) => (
            <SectionReveal
              key={e.id}
              as="li"
              variant={revealVariantFromIndex(i)}
              delay={i * 0.05}
              className="rounded-2xl border border-white/10 bg-night/60 px-4 py-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-2 font-display text-base text-white">{e.title}</p>
              <p className="text-sm text-muted">
                {e.location} · {e.dateLabel}
              </p>
              <p className="mt-2 text-sm text-neon-blue">{e.highlight}</p>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
