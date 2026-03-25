import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { ContactForm } from "@/components/ContactForm";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact | Book Amber Jane" },
  description: `Book ${site.name} — send your event details for availability and a custom quote.`,
  keywords: buildKeywords(["book DJ", "DJ inquiry", site.city]),
};

const social = [
  { label: "Instagram", href: site.social.instagram },
  { label: "SoundCloud", href: site.social.soundcloud },
  { label: "Spotify", href: site.social.spotify },
  { label: "Mixcloud", href: site.social.mixcloud },
];

export default function ContactPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="down">
          <PageTitle eyebrow="Contact" title="Let's plan" titleGradient="your event" />
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Share your date, venue, guest count, and vibe. We typically respond within{" "}
            <span className="text-foreground">1–2 business days</span> with availability and next
            steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <a className="font-medium text-neon-blue hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a
              className="font-medium text-neon-blue hover:underline"
              href={`tel:${site.phone.replace(/\D/g, "")}`}
            >
              {site.phone}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-4 text-sm text-muted">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-blue"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>
        <SectionReveal variant="up" delay={0.08} className="mt-10 max-w-2xl">
          <ContactForm />
        </SectionReveal>
      </div>
    </div>
  );
}
