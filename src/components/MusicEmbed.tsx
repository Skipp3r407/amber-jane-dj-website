"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MixEntry, MixPlatform } from "@/data/mixes";
import { GenreTagList } from "@/components/GenreTagList";

function embedHeight(embedUrl: string, platform: MixPlatform) {
  if (embedUrl.includes("spotify.com")) return 152;
  if (platform === "mixcloud") return 120;
  return 166;
}

type MusicEmbedProps = {
  mix: MixEntry;
  className?: string;
};

export function MusicEmbed({ mix, className }: MusicEmbedProps) {
  const hasEmbed = Boolean(mix.embedUrl);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-midnight/50 to-night/80 shadow-lg shadow-black/30",
        className,
      )}
    >
      <div className="border-b border-white/10 bg-white/[0.03] p-5">
        <h3 className="font-display text-lg text-foreground">{mix.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{mix.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span>{mix.duration}</span>
          <span>•</span>
          <span>{mix.year}</span>
          <span>•</span>
          <span className="uppercase tracking-wider text-violet-soft/90">
            {mix.platform === "placeholder" ? "Player" : mix.platform}
          </span>
        </div>
        <GenreTagList genres={mix.genres} className="mt-3" />
      </div>

      <div className="p-4">
        {hasEmbed && mix.embedUrl ? (
          <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
            <iframe
              title={`${mix.title} player`}
              src={mix.embedUrl}
              width="100%"
              height={embedHeight(mix.embedUrl, mix.platform)}
              className="w-full bg-black"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 bg-night/80 px-4 py-10 text-center">
            <p className="text-sm font-medium text-zinc-300">Player coming soon</p>
            <p className="mt-2 text-xs text-zinc-500">
              This mix will appear with a full player here once it&apos;s connected.
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}
