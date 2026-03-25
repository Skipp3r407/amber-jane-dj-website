import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { HeadlineTitle } from "@/components/HeadlineTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { services, faqItems } from "@/data/content";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Book Amber Jane | DJ Services for Events" },
  description: `Book ${site.name} for private parties, weddings, nightlife, corporate events, and custom DJ sets — tailored quotes, no fixed packages.`,
  keywords: buildKeywords(["book DJ", "wedding DJ", "corporate DJ", "nightlife DJ"]),
};

const bookingSteps = [
  { title: "Inquire", body: "Share date, location, guest count, and vibe via the contact form." },
  { title: "Align", body: "We confirm availability, scope, and music direction for your room." },
  { title: "Quote", body: "You receive a custom quote based on timing, travel, and production needs." },
  { title: "Lock", body: "Contract and deposit to secure the date — then we refine the plan." },
];

export default function ServicesPage() {
  const snippet = faqItems.slice(0, 3);

  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="left">
          <PageTitle
            eyebrow="Bookings"
            title="Services built around"
            titleGradient="your night"
            subtitle="Every format gets a different energy and structure — quotes are always custom. Share your details and we'll follow up with availability and pricing guidance."
          />
        </SectionReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <SectionReveal key={s.title} delay={i * 0.05} variant={revealVariantFromIndex(i)}>
              <ServiceCard
                title={s.title}
                description={s.description}
                audience={s.audience}
                icon={s.icon}
              />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal variant="down" className="mt-16 block rounded-3xl border border-white/10 bg-midnight/25 p-8 sm:p-10">
          <HeadlineTitle as="h2" size="subsection" title="Booking" titleGradient="process" />
          <ol className="mt-6 grid gap-6 sm:grid-cols-2">
            {bookingSteps.map((b, i) => (
              <li key={b.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-sm text-neon-blue">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg text-foreground">{b.title}</p>
                  <p className="mt-1 text-sm text-muted">{b.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">
            No posted package pricing — every event is scoped individually.{" "}
            <Link href="/contact" className="font-semibold text-neon-blue hover:underline">
              Start an inquiry
            </Link>
            .
          </p>
        </SectionReveal>

        <div className="mt-16">
          <SectionReveal variant="right">
            <HeadlineTitle as="h2" size="subsection" title="Quick" titleGradient="answers" />
            <p className="mt-2 text-sm text-muted">
              Full FAQ on the{" "}
              <Link href="/faq" className="text-neon-blue hover:underline">
                FAQ page
              </Link>
              .
            </p>
          </SectionReveal>
          <SectionReveal variant="up" delay={0.06} className="mt-6">
            <FAQAccordion items={snippet} />
          </SectionReveal>
        </div>
      </div>
      <div className="mt-16">
        <CTASection
          title="Tell us about your event"
          subtitle="Date, city, guest count, and vibe — we’ll reply with availability and a custom quote."
        />
      </div>
    </div>
  );
}
