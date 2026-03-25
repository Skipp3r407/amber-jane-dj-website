"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";
import { cn } from "@/lib/utils";

const BAR_COUNT = 40;

/**
 * Left-edge EQ strip (background only). When site audio is playing, bars follow frequency data + hue.
 */
export function BackgroundRadioBars() {
  const { getAnalyser, isPlaying, hasAudio } = useHomeMusic();
  const reduce = useReducedMotion();
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef(0);

  const bars = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, i) => ({ id: i, delay: `${(i * 0.05) % 1.6}s`, duration: `${0.8 + (i % 9) * 0.1}s` })),
    [],
  );

  const reactive = Boolean(hasAudio && isPlaying && !reduce);

  useEffect(() => {
    if (!reactive) {
      for (let i = 0; i < BAR_COUNT; i++) {
        const el = barRefs.current[i];
        if (!el) continue;
        el.style.removeProperty("transform");
        el.style.removeProperty("opacity");
        el.style.removeProperty("background");
      }
      return;
    }

    let stopped = false;

    const tick = () => {
      if (stopped) return;
      const analyser = getAnalyser();
      if (!analyser) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      for (let i = 0; i < BAR_COUNT; i++) {
        const el = barRefs.current[i];
        if (!el) continue;
        const start = Math.floor((i / BAR_COUNT) * data.length);
        const end = Math.max(start + 1, Math.floor(((i + 1) / BAR_COUNT) * data.length));
        let sum = 0;
        for (let j = start; j < end; j++) sum += data[j]!;
        const avg = sum / (end - start);
        const t = avg / 255;
        const scale = 0.12 + t * 0.88;
        el.style.transform = `scaleY(${scale})`;
        el.style.transformOrigin = "bottom";
        el.style.opacity = String(0.38 + t * 0.58);
        const hue1 = 175 + (i / BAR_COUNT) * 100 + t * 55;
        const hue2 = (hue1 + 45 + t * 30) % 360;
        el.style.background = `linear-gradient(to top, hsl(${hue1}, 78%, 44%), hsl(${hue2}, 72%, 56%))`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
      // Snapshot DOM nodes for cleanup (refs may be reassigned before this runs).
      const snapshot = [...barRefs.current];
      for (const el of snapshot) {
        if (!el) continue;
        el.style.removeProperty("transform");
        el.style.removeProperty("opacity");
        el.style.removeProperty("background");
      }
    };
  }, [reactive, getAnalyser]);

  const showCss = !reactive;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[1] h-full w-14 overflow-hidden sm:w-[4.5rem] md:w-28"
      aria-hidden
    >
      <div
        className={cn(
          "flex h-full w-full flex-row items-end justify-stretch gap-[2px] px-1.5 opacity-[0.13] mix-blend-soft-light sm:gap-1 sm:opacity-[0.17] sm:px-2",
          "[mask-image:linear-gradient(to_right,black_45%,transparent_100%)]",
        )}
      >
        {bars.map((b, i) => (
          <span
            key={b.id}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className={cn(
              "block h-full min-h-0 flex-1 rounded-full bg-gradient-to-t from-neon-blue/50 via-neon-purple/40 to-neon-pink/45",
              showCss && "eq-bar-bg",
            )}
            style={
              showCss
                ? {
                    animationDelay: b.delay,
                    animationDuration: b.duration,
                  }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
