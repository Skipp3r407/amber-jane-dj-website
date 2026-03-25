import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqItems } from "@/data/content";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "FAQ | Amber Jane" },
  description: `Answers about booking ${site.name} — events, travel, playlists, pricing, and availability.`,
  keywords: buildKeywords(["DJ FAQ", "booking", "availability"]),
};

export default function FaqPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionReveal variant="left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">FAQ</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Questions, answered
          </h1>
          <p className="mt-4 text-lg text-muted">
            Straightforward — for anything custom, use the contact form or Amber Assistant.
          </p>
        </SectionReveal>
        <SectionReveal variant="right" delay={0.06} className="mt-12">
          <FAQAccordion items={faqItems} />
        </SectionReveal>
      </div>
      <div className="mt-16">
        <CTASection
          title="Still have questions?"
          subtitle="We reply quickly — especially for date holds and travel planning."
        />
      </div>
    </div>
  );
}
