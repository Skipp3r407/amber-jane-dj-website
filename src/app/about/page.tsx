import Image from "next/image";
import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { CTASection } from "@/components/CTASection";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Amber Jane | DJ & Event Entertainment" },
  description: `The story behind ${site.name} — performance philosophy, music direction, and why clients book.`,
  keywords: buildKeywords(["about DJ", "DJ bio", "event DJ"]),
};

export default function AboutPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">About</p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">Amber Jane</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            I&apos;m a DJ first — obsessed with transitions, tension, release, and the moment the
            room ignites. From intimate ceremonies to peak-hour clubs, every set is built around
            your crowd.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionReveal delay={0.05}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80"
                alt="DJ headphones and performance energy"
                width={900}
                height={700}
                className="h-[320px] w-full object-cover sm:h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-2xl text-white">The approach</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>
                • <span className="text-zinc-200">Crowd reading</span> — pacing the night so the
                floor builds naturally.
              </li>
              <li>
                • <span className="text-zinc-200">Sonic polish</span> — clean gain staging, smooth
                EQ, and mixes that breathe.
              </li>
              <li>
                • <span className="text-zinc-200">Professional delivery</span> — punctual, prepared,
                and easy to work with on-site.
              </li>
            </ul>
            <p className="mt-6 text-sm text-zinc-500">
              Based in {site.city} — available for travel and destination events.
            </p>
          </SectionReveal>
        </div>
      </div>
      <div className="mt-16">
        <CTASection
          title="Bring the energy to your event"
          subtitle="Share your vision — we’ll align on format, timeline, and production."
        />
      </div>
    </div>
  );
}
