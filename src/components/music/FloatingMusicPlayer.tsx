"use client";

import { motion } from "framer-motion";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";
import { cn } from "@/lib/utils";

export function FloatingMusicPlayer() {
  const { isPlaying, trackTitle, hasAudio, toggle } = useHomeMusic();

  if (!hasAudio) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 32, delay: 0.15 }}
      className={cn(
        "fixed z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm",
        "bottom-20 right-4 sm:bottom-8 sm:right-6",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-white/15 bg-night/90 px-3 py-2.5 shadow-xl shadow-black/40 backdrop-blur-xl",
          "ring-1 ring-white/10 transition-shadow duration-300",
          isPlaying && "border-neon-pink/30 shadow-[0_0_32px_rgba(255,60,172,0.14)]",
        )}
      >
        <button
          type="button"
          onClick={() => void toggle()}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple text-white shadow-neon transition hover:scale-105 hover:brightness-110",
            isPlaying && "ring-2 ring-neon-pink/40 ring-offset-2 ring-offset-night",
          )}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neon-blue">
            Now playing
          </p>
          <p className="truncate font-display text-sm text-foreground">{trackTitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
