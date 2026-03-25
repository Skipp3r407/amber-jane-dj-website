import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ABOUT_SECTION_MEDIA_SRC, PremiumMediaFrame } from "@/components/PremiumMediaFrame";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { MusicCard } from "@/components/MusicCard";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { EventCard } from "@/components/EventCard";
import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { AvailabilityStrip } from "@/components/AvailabilityStrip";
import { ReviewHighlightBanner } from "@/components/ReviewHighlightBanner";
import {
  mixesPreview,
  services,
  testimonials,
  events,
  whyBook,
} from "@/data/content";
import { upcomingEvents } from "@/data/eventsCalendar";
import { site, buildKeywords } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  keywords: buildKeywords(["DJ booking", site.city]),
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
  },
};

export default function HomePage() {
  const demoAudio = process.env.NEXT_PUBLIC_MIX_DEMO_URL ?? null;

  return (
    <>
      <HeroSection />

      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Mixes & music"
              title="Featured mixes"
              subtitle="Floor-tested energy — embed your SoundCloud, Spotify, or Mixcloud players on the Mixes page when ready."
            />
            <Link
              href="/mixes"
              className="inline-flex w-fit rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:border-neon-pink/50"
            >
              All music
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {mixesPreview.map((m, i) => (
              <SectionReveal key={m.id} delay={i * 0.06} variant={i % 3 === 1 ? "left" : i % 3 === 2 ? "right" : "up"}>
                <MusicCard
                  title={m.title}
                  genre={m.genre}
                  duration={m.duration}
                  year={m.year}
                  audioSrc={i === 0 ? demoAudio : null}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Bookings"
            title="Built for your night"
            subtitle="From intimate lounges to headline rooms — flexible formats, polished production, and a set that matches your crowd."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services.slice(0, 4).map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.05} variant={i % 2 === 0 ? "left" : "right"}>
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  audience={s.audience}
                  icon={s.icon}
                />
              </SectionReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-white/10 transition hover:scale-[1.02] hover:bg-white/10"
            >
              Explore bookings
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Why Amber Jane"
            title="Performance you can trust"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyBook.map((w, i) => (
              <SectionReveal key={w.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-white/10 bg-midnight/30 p-6 ring-1 ring-white/5">
                  <h3 className="font-display text-lg text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionReveal variant="left">
            <PremiumMediaFrame
              src={ABOUT_SECTION_MEDIA_SRC}
              alt="Amber Jane — DJ performance and creative energy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="max-h-[280px] sm:max-h-[320px] lg:max-h-[360px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
            </PremiumMediaFrame>
          </SectionReveal>
          <SectionReveal variant="right">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">About</p>
            <h2 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
              Artist energy, professional execution
            </h2>
            <p className="mt-4 text-muted">
              Amber Jane builds sets with intention — tension, release, and moments that hit. From
              refined receptions to peak-hour clubs, the goal is simple: a night people remember.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-300">
              <li>• Crowd-first pacing and seamless transitions</li>
              <li>• Polished production and confident stage presence</li>
              <li>• Collaborative planning with planners and venues</li>
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:border-neon-blue/40"
            >
              Full story
            </Link>
          </SectionReveal>
        </div>
      </section>

      <AvailabilityStrip events={upcomingEvents} />

      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Experience"
              title="Recent highlights"
              subtitle="A snapshot of recent rooms — swap in your real credits anytime."
            />
            <Link
              href="/events"
              className="text-sm font-semibold text-neon-blue hover:underline"
            >
              Full events
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {events.map((e, i) => (
              <SectionReveal key={e.title} delay={i * 0.05}>
                <EventCard
                  title={e.title}
                  location={e.location}
                  date={e.date}
                  highlight={e.highlight}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <ReviewHighlightBanner />

      <section className="border-b border-white/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Testimonials" title="Proof on the floor" />
            <Link
              href="/testimonials"
              className="text-sm font-semibold text-neon-blue hover:underline"
            >
              More reviews
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.06}>
                <TestimonialCard quote={t.quote} name={t.name} role={t.role} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Create an Unforgettable Night?"
        subtitle="Share your date, city, and vibe — we’ll follow up with availability and a custom quote."
        primaryLabel="Check Availability"
        primaryHref="/contact"
        secondaryLabel="Book Amber Jane"
        secondaryHref="/contact"
      />

      <section id="contact" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s plan your event"
            subtitle={
              <>
                Tell us what you&apos;re dreaming up — we&apos;ll reply with availability and next
                steps. Prefer email?{" "}
                <a className="text-neon-blue hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </>
            }
          />
          <div className="mt-10 max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
