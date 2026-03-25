import Link from "next/link";
import type { CalendarEvent } from "@/data/eventsCalendar";

type AvailabilityStripProps = {
  events: CalendarEvent[];
};

export function AvailabilityStrip({ events }: AvailabilityStripProps) {
  if (events.length === 0) return null;

  return (
    <section className="border-y border-white/10 bg-midnight/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">
              Availability & upcoming
            </p>
            <h2 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
              On the calendar
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Dates move fast — inquire early for peak weekends and festival season.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit shrink-0 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 text-sm font-semibold text-white shadow-neon transition hover:brightness-110"
          >
            Want Amber Jane at your event? Inquire now
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {events.map((e) => (
            <li
              key={e.id}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
