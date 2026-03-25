"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Waveform } from "@/components/Waveform";

type MusicCardProps = {
  title: string;
  genre: string;
  duration: string;
  year: string;
  audioSrc?: string | null;
};

export function MusicCard({
  title,
  genre,
  duration,
  year,
  audioSrc,
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

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 shadow-lg shadow-black/30"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-pink/20 blur-3xl transition group-hover:bg-neon-purple/25" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg text-white">{title}</h3>
            <p className="mt-1 text-sm text-neon-blue">{genre}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-400">
            {year}
          </span>
        </div>
        <div className="mt-4">
          <Waveform active={playing || !audioSrc} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {duration}
          </span>
          <button
            type="button"
            onClick={toggle}
            disabled={!audioSrc}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
              audioSrc
                ? "bg-gradient-to-r from-neon-pink/90 to-neon-purple/90 text-white shadow-neon hover:brightness-110"
                : "cursor-not-allowed border border-white/10 bg-white/5 text-zinc-500",
            )}
          >
            {audioSrc ? (playing ? "Pause" : "Play") : "Audio soon"}
          </button>
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
