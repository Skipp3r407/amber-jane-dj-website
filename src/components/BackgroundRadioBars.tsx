"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";
import { cn } from "@/lib/utils";

const BAR_COUNT = 40;

/**
 * Left-edge EQ strip — transparent, white bars anchored at the top (extend downward).
 * Reactive mode uses Web Audio levels in white; idle uses CSS pulse.
 */
export function BackgroundRadioBars() {
  const { getAnalyser, isPlaying, hasAudio } = useHomeMusic();
  const reduce = useReducedMotion();
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef(0);

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        id: i,
        delay: `${(i * 0.05) % 1.6}s`,
        duration: `${0.8 + (i % 9) * 0.1}s`,
      })),
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
        el.style.removeProperty("box-shadow");
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
        const scale = 0.1 + t * 0.9;
        el.style.transform = `scaleY(${scale})`;
        el.style.transformOrigin = "top center";
        const alpha = 0.35 + t * 0.6;
        el.style.background = `linear-gradient(to bottom, rgba(255,255,255,${Math.min(0.98, alpha + 0.08)}), rgba(255,255,255,${alpha * 0.75}))`;
        el.style.opacity = String(0.55 + t * 0.4);
        el.style.boxShadow = `0 0 ${8 + t * 18}px rgba(255,255,255,${0.08 + t * 0.12})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
      const snapshot = [...barRefs.current];
      for (const el of snapshot) {
        if (!el) continue;
        el.style.removeProperty("transform");
        el.style.removeProperty("opacity");
        el.style.removeProperty("background");
        el.style.removeProperty("box-shadow");
      }
    };
  }, [reactive, getAnalyser]);

  const showCss = !reactive;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[8] h-full w-[4.25rem] overflow-visible bg-transparent sm:w-24 md:w-28"
      aria-hidden
    >
      <div
        className={cn(
          "flex h-full w-full flex-row items-start justify-stretch gap-[3px] bg-transparent px-1.5 pt-4 sm:gap-1.5 sm:px-2 sm:pt-6",
          "[mask-image:linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.65)_55%,transparent_100%)]",
        )}
      >
        {bars.map((b, i) => (
          <span
            key={b.id}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className={cn(
              "block h-full min-h-0 flex-1 rounded-full bg-gradient-to-b from-white/95 via-white/75 to-white/45 shadow-[0_0_12px_rgba(255,255,255,0.12)]",
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
