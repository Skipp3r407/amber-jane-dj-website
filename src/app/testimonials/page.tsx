import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
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
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">
            Testimonials
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">Client love</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Real feedback from planners, couples, and venues.
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.06}>
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
