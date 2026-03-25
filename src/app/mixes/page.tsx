import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { HeadlineTitle } from "@/components/HeadlineTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { MusicEmbed } from "@/components/MusicEmbed";
import { GenreTagList } from "@/components/GenreTagList";
import { CTASection } from "@/components/CTASection";
import { mixes, signatureGenres } from "@/data/mixes";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Mixes | Amber Jane" },
  description: `Listen to mixes and sets from ${site.name} — SoundCloud players and catalog.`,
  keywords: buildKeywords(["DJ mixes", "SoundCloud"]),
};

export default function MixesPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="down">
          <PageTitle
            eyebrow="Mixes"
            title="Music &"
            titleGradient="signature sound"
            subtitle="Full SoundCloud catalog — every track below has a live player. Tap play on the widget to listen."
          />
        </SectionReveal>

        <SectionReveal variant="left" className="mt-12 block rounded-3xl border border-white/10 bg-midnight/20 p-8 sm:p-10">
          <HeadlineTitle as="h2" size="section" title="Signature sound" titleGradient="& genres" />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Sets are tailored to your crowd — these tags are a starting point for direction and mood.
          </p>
          <GenreTagList genres={signatureGenres} className="mt-6" />
        </SectionReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-1">
          {mixes.map((m, i) => (
            <SectionReveal key={m.id} delay={i * 0.06} variant={revealVariantFromIndex(i)}>
              <MusicEmbed mix={m} />
            </SectionReveal>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <CTASection
          title="Want this energy"
          titleGradient="live?"
          subtitle="Send your date and venue — we’ll align on format and music direction."
          secondaryLabel="FAQ"
          secondaryHref="/faq"
          primaryLabel="Check availability"
        />
      </div>
    </div>
  );
}
