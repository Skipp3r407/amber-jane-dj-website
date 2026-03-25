"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";
import { useVisualizerLevels, type VisualizerMode } from "@/hooks/useVisualizerLevels";

export type { VisualizerMode } from "@/hooks/useVisualizerLevels";

const DEFAULT_BARS = 18;

export type FloatingVisualizerProps = {
  className?: string;
  /** Override context play state when set */
  isPlaying?: boolean;
  /** 0.5 = calmer, 1.5 = stronger motion */
  intensity?: number;
  /** `auto`: Web Audio when available, else simulated. `simulated`: always fake (e.g. SoundCloud-only). */
  mode?: VisualizerMode;
  /** Number of vertical bars */
  barCount?: number;
};

/**
 * Premium mini EQ: pink→purple gradient, soft glow, ~35% opacity.
 * Works with site mix via AnalyserNode; falls back to smooth simulated motion when
 * SoundCloud embeds cannot be analyzed.
 */
export function FloatingVisualizer({
  className,
  isPlaying: isPlayingProp,
  intensity = 1,
  mode = "auto",
  barCount = DEFAULT_BARS,
}: FloatingVisualizerProps) {
  const reduce = useReducedMotion();
  const { isPlaying: ctxPlaying, getAnalyser } = useHomeMusic();
  const isPlaying = isPlayingProp ?? ctxPlaying;

  const levels = useVisualizerLevels({
    barCount,
    isPlaying,
    getAnalyser,
    mode,
    intensity,
    reducedMotion: Boolean(reduce),
  });

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-1/2 top-[52%] z-[8] -translate-x-1/2 -translate-y-1/2 select-none",
        "opacity-[0.35]",
        "w-[min(92vw,18rem)] sm:w-[min(85vw,20rem)]",
        className,
      )}
      aria-hidden
    >
      {/* Ambient glow — behind bars */}
      <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-gradient-to-b from-neon-pink/20 via-transparent to-neon-purple/25 blur-3xl" />

      <div
        className={cn(
          "relative mx-auto flex h-[min(4.25in,42vh)] items-end justify-center gap-[3px] px-2 sm:h-[min(5in,50vh)] sm:gap-1.5 md:h-[5in]",
          "drop-shadow-[0_0_32px_rgba(123,44,255,0.15)]",
        )}
      >
        {levels.map((level, i) => {
          const t = i / Math.max(1, barCount - 1);
          const hPct = Math.max(0.08, level) * 100;
          return (
            <div
              key={i}
              className="flex h-full min-w-[3px] max-w-[6px] flex-1 flex-col justify-end sm:min-w-[4px]"
            >
              <div
                className="w-full origin-bottom rounded-full shadow-[0_0_14px_rgba(255,60,172,0.35),0_0_22px_rgba(123,44,255,0.22)]"
                style={{
                  height: `${hPct}%`,
                  minHeight: 4,
                  background: `linear-gradient(to top, rgb(${123 + t * 40}, ${44 + t * 20}, 255), rgb(255, ${60 + t * 30}, 172))`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
