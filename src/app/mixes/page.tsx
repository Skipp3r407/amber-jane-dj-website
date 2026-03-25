import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
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
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">Mixes</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Music & signature sound
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Featured mixes below — paste embed URLs in{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-neon-blue">
              src/data/mixes.ts
            </code>
            . Optional MP3 demo: set{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-neon-blue">
              NEXT_PUBLIC_MIX_DEMO_URL
            </code>
            .
          </p>
        </SectionReveal>

        <section className="mt-12 rounded-3xl border border-white/10 bg-midnight/20 p-8 sm:p-10">
          <h2 className="font-display text-xl text-foreground sm:text-2xl">Signature sound & genres</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Sets are tailored to your crowd — these tags are a starting point for direction and mood.
          </p>
          <GenreTagList genres={signatureGenres} className="mt-6" />
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-1">
          {mixes.map((m, i) => (
            <SectionReveal key={m.id} delay={i * 0.06}>
              <MusicEmbed mix={m} />
            </SectionReveal>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-xl text-foreground">Compact players</h2>
          <p className="mt-2 text-sm text-muted">
            Alternate card layout — first card can use a direct MP3 URL for a lightweight demo.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {mixesPreview.map((m, i) => (
              <SectionReveal key={m.id} delay={i * 0.05}>
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
