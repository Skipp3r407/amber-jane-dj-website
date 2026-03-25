import Link from "next/link";
import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { HeadlineTitle } from "@/components/HeadlineTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { EventCard } from "@/components/EventCard";
import { CTASection } from "@/components/CTASection";
import { upcomingEvents, pastEvents } from "@/data/eventsCalendar";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Events | Amber Jane" },
  description: `Upcoming dates and past performances — ${site.name} live at clubs, weddings, and festivals.`,
  keywords: buildKeywords(["DJ events", "live shows", "venues"]),
};

export default function EventsPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="down">
          <PageTitle
            eyebrow="Events"
            title="Calendar"
            titleGradient="& credibility"
            subtitle="Upcoming dates and past highlights — clubs, weddings, festivals, and private rooms."
          />
        </SectionReveal>

        <section className="mt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionReveal variant="left" className="min-w-0">
              <HeadlineTitle as="h2" size="subsection" title="Upcoming" titleGradient="dates" />
              <p className="mt-1 text-sm text-muted">Dates and holds — inquire for similar slots.</p>
            </SectionReveal>
            <SectionReveal variant="right" delay={0.05} className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex w-fit rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-5 py-2.5 text-sm font-semibold text-white shadow-neon transition hover:scale-[1.02]"
              >
                Want Amber Jane at your event? Inquire now
              </Link>
            </SectionReveal>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {upcomingEvents.map((e, i) => (
              <SectionReveal key={e.id} delay={i * 0.05} variant={revealVariantFromIndex(i)}>
                <EventCard
                  title={e.title}
                  location={e.location}
                  date={e.dateLabel}
                  highlight={e.highlight}
                  tags={e.tags}
                />
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionReveal variant="up">
            <HeadlineTitle as="h2" size="subsection" title="Past" titleGradient="shows" />
            <p className="mt-1 text-sm text-muted">Highlights — proof on the floor.</p>
          </SectionReveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {pastEvents.map((e, i) => (
              <SectionReveal key={e.id} delay={i * 0.04} variant={revealVariantFromIndex(i + 1)}>
                <EventCard
                  title={e.title}
                  location={e.location}
                  date={e.dateLabel}
                  highlight={e.highlight}
                  tags={e.tags}
                />
              </SectionReveal>
            ))}
          </div>
        </section>

        <SectionReveal variant="down" className="mt-16 block rounded-3xl border border-dashed border-white/15 bg-night/50 p-8 text-center">
          <HeadlineTitle as="h2" size="subsection" title="Photo" titleGradient="gallery" align="center" />
          <p className="mt-2 text-sm text-muted">
            Add photography and video stills on the{" "}
            <Link href="/gallery" className="text-neon-blue hover:underline">
              Gallery
            </Link>{" "}
            page.
          </p>
        </SectionReveal>
      </div>
      <div className="mt-16">
        <CTASection
          title="Available for"
          titleGradient="upcoming events"
          subtitle="Share your vision — we’ll confirm availability and build a custom quote."
        />
      </div>
    </div>
  );
}
