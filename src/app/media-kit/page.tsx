import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { HeadlineTitle } from "@/components/HeadlineTitle";
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
        <SectionReveal variant="up">
          <PageTitle
            eyebrow="Press"
            title="Media"
            titleGradient="kit"
            subtitle="Short-form bio and booking details for promoters, planners, and editorial."
          />
        </SectionReveal>

        <div className="mt-10 space-y-8 rounded-3xl border border-white/10 bg-midnight/25 p-8 text-sm leading-relaxed text-muted">
          <SectionReveal variant="left">
            <HeadlineTitle as="h2" size="subsection" title="The" titleGradient="one-liner" />
            <p className="mt-2">
              {site.name} is a professional DJ delivering premium, crowd-first sets for private
              events, nightlife, weddings, and corporate experiences.
            </p>
          </SectionReveal>
          <SectionReveal variant="right" delay={0.05}>
            <HeadlineTitle as="h2" size="subsection" title="Short" titleGradient="bio" />
            <p className="mt-2">
              Known for seamless mixing and intuitive crowd reading, {site.name} builds sets that
              balance polish with peak-hour energy — from intimate lounges to festival stages.
            </p>
          </SectionReveal>
          <SectionReveal variant="up" delay={0.08}>
            <HeadlineTitle as="h2" size="subsection" title="Booking" titleGradient="& contact" />
            <p className="mt-2">
              {site.email} · {site.phone}
            </p>
          </SectionReveal>
          <SectionReveal variant="down" delay={0.1}>
            <HeadlineTitle as="h2" size="subsection" title="Brand" titleGradient="assets" />
            <p className="mt-2">Hi-res photos, logos, and tech riders available on request.</p>
          </SectionReveal>
        </div>

        <SectionReveal variant="up" className="mt-8 block text-center text-sm text-muted">
          <Link href="/gallery" className="text-neon-blue hover:underline">
            Visual gallery
          </Link>
        </SectionReveal>
      </div>
      <div className="mt-16">
        <CTASection
          title="Book or request"
          titleGradient="press assets"
          subtitle="We’ll send approved press materials."
        />
      </div>
    </div>
  );
}
