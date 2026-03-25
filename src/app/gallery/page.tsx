import Image from "next/image";
import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTitle } from "@/components/PageTitle";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { CTASection } from "@/components/CTASection";
import { site, buildKeywords } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Gallery | Amber Jane" },
  description: `Photo gallery — live energy, venues, and performance moments featuring ${site.name}.`,
  keywords: buildKeywords(["DJ photos", "event gallery"]),
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    alt: "Concert crowd with stage lights",
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    alt: "DJ hands on mixer with colorful lights",
  },
  {
    src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80",
    alt: "Event lighting and atmosphere",
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    alt: "DJ headphones and creative performance",
  },
] as const;

export default function GalleryPage() {
  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="down">
          <PageTitle
            eyebrow="Gallery"
            title="In the"
            titleGradient="room"
            subtitle="Live energy, venues, and moments from the booth and the dance floor."
          />
        </SectionReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {galleryImages.map((p, i) => (
            <SectionReveal key={p.src} delay={i * 0.05} variant={revealVariantFromIndex(i)}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={800}
                  height={560}
                  className="h-56 w-full object-cover sm:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <CTASection title="Bring this energy to your event" />
      </div>
    </div>
  );
}
