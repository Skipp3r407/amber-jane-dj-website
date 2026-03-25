import Image from "next/image";
import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { HeadlineTitle } from "@/components/HeadlineTitle";
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
        <SectionReveal variant="down">
          <PageTitle eyebrow="About" title="Amber" titleGradient="Jane" />
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            I&apos;m a DJ first — obsessed with transitions, tension, release, and the moment the
            room ignites. From intimate ceremonies to peak-hour clubs, every set is built around
            your crowd.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionReveal delay={0.05} variant="left">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/amber2.png"
                alt="Amber Jane performing live"
                width={900}
                height={700}
                className="h-[320px] w-full object-cover sm:h-[380px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1} variant="right">
            <HeadlineTitle as="h2" size="subsection" title="The" titleGradient="approach" />
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
