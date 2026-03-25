"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Hero — local brand photography (see /public/images/hero-amber-jane.png). */
export const HERO_MEDIA_SRC = "/images/hero-amber-jane.png";

export const ABOUT_SECTION_MEDIA_SRC =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80";

type PremiumMediaFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Outer frame: aspect + max width. Default tuned for hero / split layouts. */
  className?: string;
  /** Extra classes on the photo layer (e.g. hover). */
  imageClassName?: string;
  children?: React.ReactNode;
};

export function PremiumMediaFrame({
  src,
  alt,
  priority,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
  imageClassName,
  children,
}: PremiumMediaFrameProps) {
  const [mediaFailed, setMediaFailed] = useState(false);

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border border-white/15 bg-[#0a0614] shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-sm transition duration-500 hover:border-white/25 hover:shadow-[0_0_40px_-8px_rgba(123,44,255,0.35)]",
        "aspect-[5/4] max-h-[320px] sm:aspect-[4/3] sm:max-h-[360px] lg:max-h-[400px]",
        className,
      )}
    >
      {/* Premium fallback: always visible under photo; full surface if image fails (no broken img). */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#12081f] via-midnight to-[#050a18]" />
        <div
          className="absolute inset-0 bg-[length:200%_200%] opacity-90 motion-safe:animate-gradient-shift"
          style={{
            backgroundImage:
              "linear-gradient(128deg, rgba(255,60,172,0.45), rgba(123,44,255,0.38), rgba(0,194,255,0.32), rgba(255,60,172,0.25))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
        <div className="media-panel-noise absolute inset-0" />
        <div className="absolute -left-1/4 top-1/2 h-[140%] w-[80%] -translate-y-1/2 rounded-full bg-neon-purple/25 blur-[64px]" />
        <div className="absolute -right-1/4 bottom-0 h-[90%] w-[70%] rounded-full bg-neon-pink/20 blur-[56px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,194,255,0.12),transparent_55%)]" />
      </div>

      {!mediaFailed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "z-[1] object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.03]",
            imageClassName,
          )}
          onError={() => setMediaFailed(true)}
        />
      ) : null}

      <div className="absolute inset-0 z-[2]">{children}</div>
    </div>
  );
}
