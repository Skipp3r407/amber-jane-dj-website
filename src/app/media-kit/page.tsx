import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { CTASection } from "@/components/CTASection";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Press & Media Kit | Amber Jane" },
  description: `Press kit and bio for ${site.name} — booking, credits, and brand assets.`,
  keywords: buildKeywords(["press kit", "DJ bio", "media"]),
};

export default function MediaKitPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">Press</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Media kit
          </h1>
          <p className="mt-4 text-lg text-muted">
            Short-form bio and booking details for promoters, planners, and editorial. Replace
            placeholders with your final copy and assets.
          </p>
        </SectionReveal>

        <div className="mt-10 space-y-8 rounded-3xl border border-white/10 bg-midnight/25 p-8 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="font-display text-lg text-foreground">One-liner</h2>
            <p className="mt-2">
              {site.name} is a professional DJ delivering premium, crowd-first sets for private
              events, nightlife, weddings, and corporate experiences.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-foreground">Short bio</h2>
            <p className="mt-2">
              Known for seamless mixing and intuitive crowd reading, {site.name} builds sets that
              balance polish with peak-hour energy — from intimate lounges to festival stages.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-foreground">Booking</h2>
            <p className="mt-2">
              {site.email} · {site.phone}
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-foreground">Assets</h2>
            <p className="mt-2">
              Add hi-res photos, logos, and tech riders here — link to Drive/Dropbox when ready.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          <Link href="/gallery" className="text-neon-blue hover:underline">
            Visual gallery
          </Link>
        </p>
      </div>
      <div className="mt-16">
        <CTASection title="Book or request assets" subtitle="We’ll send approved press materials." />
      </div>
    </div>
  );
}
