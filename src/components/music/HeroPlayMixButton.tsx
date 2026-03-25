"use client";

import Link from "next/link";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";
import { cn } from "@/lib/utils";

export function HeroPlayMixButton() {
  const { hasAudio, playLatest, isPlaying } = useHomeMusic();

  if (!hasAudio) {
    return (
      <Link
        href="/mixes"
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:scale-[1.02] hover:border-neon-blue/50",
        )}
        title="Open the Mixes page to browse and play"
      >
        ▶ Play Latest Mix
        <span className="ml-2 text-xs font-normal text-muted">(browse)</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void playLatest()}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60",
        "bg-gradient-to-r from-neon-pink/90 to-neon-purple/90",
        "shadow-[0_0_24px_rgba(255,60,172,0.35),0_0_48px_rgba(123,44,255,0.15)]",
        "hover:shadow-[0_0_32px_rgba(255,60,172,0.45),0_0_56px_rgba(123,44,255,0.22)]",
      )}
      aria-pressed={isPlaying}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-40 blur-xl transition group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,60,172,0.6), transparent 55%)",
        }}
      />
      <span className="relative z-10 drop-shadow-sm">▶ Play Latest Mix</span>
    </button>
  );
}
