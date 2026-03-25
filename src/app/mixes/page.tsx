import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { HeadlineTitle } from "@/components/HeadlineTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { MusicEmbed } from "@/components/MusicEmbed";
import { MusicCard } from "@/components/MusicCard";
import { GenreTagList } from "@/components/GenreTagList";
import { CTASection } from "@/components/CTASection";
import { mixes, signatureGenres } from "@/data/mixes";
import { mixesPreview } from "@/data/content";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Mixes | Amber Jane" },
  description: `Listen to mixes and sets from ${site.name} — embed SoundCloud, Spotify, or Mixcloud players.`,
  keywords: buildKeywords(["DJ mixes", "SoundCloud", "Spotify", "Mixcloud"]),
};

export default function MixesPage() {
  const demoAudio = process.env.NEXT_PUBLIC_MIX_DEMO_URL ?? null;

  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="down">
          <PageTitle
            eyebrow="Mixes"
            title="Music &"
            titleGradient="signature sound"
            subtitle="Featured mixes and full players from SoundCloud, Spotify, and more — browse below and hit play."
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

        <div className="mt-14">
          <SectionReveal variant="right">
            <HeadlineTitle as="h2" size="subsection" title="Compact" titleGradient="players" />
            <p className="mt-2 text-sm text-muted">
              Compact cards for a quick preview — tap the first card to play when a preview track is available.
            </p>
          </SectionReveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3 md:items-stretch">
            {mixesPreview.map((m, i) => (
              <SectionReveal
                key={m.id}
                className="h-full min-h-0"
                delay={i * 0.05}
                variant={revealVariantFromIndex(i + 2)}
              >
                <MusicCard
                  className="h-full"
                  title={m.title}
                  genre={m.genre}
                  duration={m.duration}
                  year={m.year}
                  audioSrc={i === 0 ? demoAudio : null}
                  listenHref={m.listenHref}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CTASection
          title="Want this energy live?"
          subtitle="Send your date and venue — we’ll align on format and music direction."
          secondaryLabel="FAQ"
          secondaryHref="/faq"
          primaryLabel="Check availability"
        />
      </div>
    </div>
  );
}
