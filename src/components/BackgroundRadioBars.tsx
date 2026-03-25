"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";

/** Vertical columns of stacked blocks (LED / spectrum style), bottom-aligned, white. */
const COLUMNS = 26;
const SEGMENTS = 14;

const segLit =
  "min-h-[2px] flex-1 rounded-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.45)]";
const segDim = "min-h-[2px] flex-1 rounded-[2px] bg-white/[0.07] shadow-none";

/**
 * Left-edge EQ: transparent — no strip background. White segment blocks, gaps, bottom-up levels.
 */
export function BackgroundRadioBars() {
  const { getAnalyser, isPlaying, hasAudio } = useHomeMusic();
  const reduce = useReducedMotion();
  const segmentRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const rafRef = useRef(0);
  const idlePhase = useRef(0);

  const reactive = Boolean(hasAudio && isPlaying && !reduce);

  useEffect(() => {
    let stopped = false;

    const applyLevels = (levels: number[]) => {
      for (let c = 0; c < COLUMNS; c++) {
        const t = Math.max(0, Math.min(1, levels[c] ?? 0));
        const active = Math.round(t * SEGMENTS);
        for (let s = 0; s < SEGMENTS; s++) {
          const el = segmentRefs.current[c]?.[s];
          if (!el) continue;
          const lit = s < active;
          el.className = lit ? segLit : segDim;
        }
      }
    };

    const tick = () => {
      if (stopped) return;
      const levels: number[] = new Array(COLUMNS);

      if (reactive) {
        const analyser = getAnalyser();
        if (analyser) {
          const data = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(data);
          for (let c = 0; c < COLUMNS; c++) {
            const start = Math.floor((c / COLUMNS) * data.length);
            const end = Math.max(start + 1, Math.floor(((c + 1) / COLUMNS) * data.length));
            let sum = 0;
            for (let j = start; j < end; j++) sum += data[j]!;
            levels[c] = sum / (end - start) / 255;
          }
        } else {
          idlePhase.current += 0.06;
          const p = idlePhase.current;
          for (let c = 0; c < COLUMNS; c++) {
            levels[c] = 0.3 + 0.55 * (0.5 + 0.5 * Math.sin(p * 1.2 + c * 0.28));
          }
        }
      } else {
        idlePhase.current += reduce ? 0 : 0.055;
        const p = idlePhase.current;
        for (let c = 0; c < COLUMNS; c++) {
          if (reduce) {
            levels[c] = 0.38;
          } else {
            levels[c] = 0.28 + 0.55 * (0.5 + 0.5 * Math.sin(p * 1.15 + c * 0.32));
          }
        }
      }

      applyLevels(levels);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [reactive, getAnalyser, reduce]);

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-0 z-[55] w-[4.25rem] bg-transparent sm:w-24 md:w-28"
      aria-hidden
    >
      {/* Above body .noise (z-50); no bg, no bottom bar — flush to viewport edges */}
      <div className="flex h-full w-full flex-row items-end justify-stretch gap-[3px] bg-transparent px-1 sm:gap-1 sm:px-1.5">
        {Array.from({ length: COLUMNS }).map((_, col) => (
          <div
            key={col}
            className="flex h-full min-h-0 min-w-0 flex-1 flex-col-reverse gap-[3px]"
          >
            {Array.from({ length: SEGMENTS }).map((_, seg) => (
              <span
                key={seg}
                ref={(el) => {
                  if (!segmentRefs.current[col]) segmentRefs.current[col] = [];
                  segmentRefs.current[col][seg] = el;
                }}
                className={segDim}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
