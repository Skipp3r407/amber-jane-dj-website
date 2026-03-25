"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Waveform } from "@/components/Waveform";

type MusicCardProps = {
  title: string;
  genre: string;
  duration: string;
  year: string;
  audioSrc?: string | null;
  /** Opens the full player on the Mixes page (same track as this card). */
  listenHref?: string | null;
  /** Home Listen section: card selects the SoundCloud embed below. */
  playlistMode?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
};

export function MusicCard({
  title,
  genre,
  duration,
  year,
  audioSrc,
  listenHref,
  playlistMode,
  selected,
  onSelect,
  className,
}: MusicCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioSrc || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      void audioRef.current.play();
      setPlaying(true);
    }
  };

  const isPlaylist = Boolean(playlistMode && onSelect);
  const waveformActive = isPlaylist
    ? Boolean(selected)
    : playing || !audioSrc;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 shadow-lg shadow-black/30",
        isPlaylist &&
          selected &&
          "border-neon-pink/50 bg-midnight/40 shadow-[0_0_28px_rgba(255,60,172,0.12)] ring-1 ring-neon-pink/40",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-pink/20 blur-3xl transition group-hover:bg-neon-purple/25" />
      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div className="min-h-[5.25rem] flex-1 pr-1">
            <h3 className="line-clamp-2 font-display text-lg leading-snug text-white">{title}</h3>
            <p className="mt-1 text-sm leading-snug text-neon-blue">{genre}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-400">
            {year}
          </span>
        </div>

        <div className="flex min-h-[2.75rem] flex-1 flex-col items-center justify-center py-3">
          <Waveform active={waveformActive} />
        </div>

        <div className="mt-auto flex shrink-0 items-center justify-between gap-2 pt-2">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {duration}
          </span>
          {isPlaylist ? (
            <button
              type="button"
              onClick={onSelect}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                selected
                  ? "bg-gradient-to-r from-neon-pink/90 to-neon-purple/90 text-white shadow-neon hover:brightness-110"
                  : "border border-white/10 bg-white/10 text-zinc-300 hover:bg-white/15",
              )}
            >
              Play
            </button>
          ) : audioSrc ? (
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={toggle}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-pink/90 to-neon-purple/90 px-4 py-2 text-sm font-semibold text-white shadow-neon transition hover:brightness-110"
              >
                {playing ? "Pause" : "Play"}
              </button>
              {listenHref ? (
                <Link
                  href={listenHref}
                  className="inline-flex items-center rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-white/5"
                >
                  Listen
                </Link>
              ) : null}
            </div>
          ) : listenHref ? (
            <Link
              href={listenHref}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-neon-pink/90 to-neon-purple/90 px-4 py-2 text-sm font-semibold text-white shadow-neon transition hover:brightness-110"
            >
              Listen
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-500"
            >
              Audio soon
            </button>
          )}
        </div>
        {audioSrc ? (
          <audio
            ref={audioRef}
            src={audioSrc}
            onEnded={() => setPlaying(false)}
            onPause={() => setPlaying(false)}
            preload="none"
          />
        ) : null}
      </div>
    </motion.article>
  );
}
