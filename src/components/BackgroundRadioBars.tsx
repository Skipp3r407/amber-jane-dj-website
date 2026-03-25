"use client";

import { useMemo } from "react";

const BAR_COUNT = 52;

/**
 * Decorative EQ / “radio bars” behind all content — pointer-events none, low opacity.
 */
export function BackgroundRadioBars() {
  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        id: i,
        delay: `${(i * 0.06) % 1.8}s`,
        duration: `${0.85 + (i % 9) * 0.11}s`,
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute bottom-0 left-1/2 flex h-[min(52vh,560px)] w-[min(100%,1280px)] -translate-x-1/2 items-end justify-center gap-[2px] px-4 pb-6 opacity-[0.11] mix-blend-soft-light sm:gap-[3px] sm:opacity-[0.15] md:pb-10 [mask-image:linear-gradient(to_top,black_50%,transparent_100%)]"
      >
        {bars.map((b) => (
          <span
            key={b.id}
            className="eq-bar-bg block h-full max-h-[min(42vh,420px)] w-[2px] shrink-0 rounded-full bg-gradient-to-t from-neon-blue/50 via-neon-purple/40 to-neon-pink/45 sm:w-[3px]"
            style={{
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
