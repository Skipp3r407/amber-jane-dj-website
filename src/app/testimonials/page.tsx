import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTASection } from "@/components/CTASection";
import { testimonials } from "@/data/content";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Testimonials | Amber Jane" },
  description: `Client and venue reviews for ${site.name} — energy, professionalism, and unforgettable nights.`,
  keywords: buildKeywords(["DJ reviews", "testimonials", "event DJ"]),
};

export default function TestimonialsPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="up">
          <PageTitle
            eyebrow="Testimonials"
            title="Client"
            titleGradient="love"
            subtitle="Real feedback from planners, couples, and venues."
          />
        </SectionReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.06} variant={revealVariantFromIndex(i)}>
              <TestimonialCard quote={t.quote} name={t.name} role={t.role} />
            </SectionReveal>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <CTASection title="Experience it for yourself" secondaryHref="/mixes" secondaryLabel="Hear mixes" />
      </div>
    </div>
  );
}
