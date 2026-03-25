"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";

/** Half the previous horizontal reach (was 16). */
const SEGMENTS = 8;
const ROWS = 26;

const RGB = {
  pink: { r: 255, g: 60, b: 172 },
  purple: { r: 123, g: 44, b: 255 },
} as const;

type Triplet = { r: number; g: number; b: number };

function lerpRgb(a: Triplet, b: Triplet, t: number): Triplet {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/** Pink (left) → purple (right), same idea as CTA `from-neon-pink to-neon-purple`. */
function gradientAtSeg(seg: number): Triplet {
  const t = seg / Math.max(1, SEGMENTS - 1);
  return lerpRgb(RGB.pink, RGB.purple, t);
}

function freqRangeForRow(freqRow: number): readonly [number, number] {
  const fMin = 45;
  const fMax = 14000;
  const t0 = freqRow / ROWS;
  const t1 = (freqRow + 1) / ROWS;
  return [
    fMin * Math.pow(fMax / fMin, t0),
    fMin * Math.pow(fMax / fMin, t1),
  ];
}

function binsForFreqRange(
  fLow: number,
  fHigh: number,
  binCount: number,
  sampleRate: number,
): readonly [number, number] {
  const nyquist = sampleRate / 2;
  const iLow = Math.floor((fLow / nyquist) * binCount);
  const iHigh = Math.ceil((fHigh / nyquist) * binCount);
  const lo = Math.max(0, Math.min(binCount - 1, iLow));
  const hi = Math.max(lo, Math.min(binCount - 1, iHigh));
  return [lo, hi];
}

function smoothToward(c: number, t: number, up: number, down: number): number {
  const d = t - c;
  return c + d * (d > 0 ? up : down);
}

const baseSeg = "h-full min-w-[2px] flex-1 rounded-[2px]";

/** ~30% lower opacity on fills vs full strength (0.7 alpha multiplier). */
const A = 0.7;

export function BackgroundRadioBars() {
  const { getAnalyser, isPlaying, hasAudio } = useHomeMusic();
  const reduce = useReducedMotion();
  const segmentRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const rafRef = useRef(0);
  const idlePhase = useRef(0);
  const smoothedRef = useRef<Float32Array>(new Float32Array(ROWS));

  const reactive = Boolean(hasAudio && isPlaying && !reduce);

  useEffect(() => {
    let stopped = false;
    smoothedRef.current.fill(0);

    const tick = () => {
      if (stopped) return;
      const smoothed = smoothedRef.current;
      const targets: number[] = new Array(ROWS);
      const analyser = reactive ? getAnalyser() : null;

      if (reactive && analyser) {
        const sampleRate = analyser.context.sampleRate;
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        for (let r = 0; r < ROWS; r++) {
          const freqRow = ROWS - 1 - r;
          const [fLo, fHi] = freqRangeForRow(freqRow);
          const [iLo, iHi] = binsForFreqRange(fLo, fHi, data.length, sampleRate);
          let sum = 0;
          for (let j = iLo; j <= iHi; j++) sum += data[j]!;
          const raw = sum / (iHi - iLo + 1) / 255;
          const shaped = Math.pow(Math.max(0, Math.min(1, raw * 1.12)), 0.88);
          const next = smoothToward(smoothed[r]!, shaped, 0.45, 0.1);
          smoothed[r] = next;
          targets[r] = next;
        }
      } else {
        idlePhase.current += reduce ? 0 : 0.012;
        const p = idlePhase.current;
        for (let r = 0; r < ROWS; r++) {
          const wave =
            0.22 +
            0.5 *
              (0.5 +
                0.5 *
                  Math.sin(p * 0.4 + r * 0.2) *
                  (0.65 + 0.35 * Math.sin(p * 0.1 + r * 0.08)));
          const target = reduce ? 0.36 : wave;
          const next = smoothToward(smoothed[r]!, target, 0.08, 0.06);
          smoothed[r] = next;
          targets[r] = next;
        }
      }

      for (let r = 0; r < ROWS; r++) {
        const t = Math.max(0, Math.min(1, targets[r] ?? 0));
        const active = Math.round(t * SEGMENTS);
        const energy = Math.max(0, Math.min(1, smoothed[r] ?? 0));
        for (let s = 0; s < SEGMENTS; s++) {
          const el = segmentRefs.current[r]?.[s];
          if (!el) continue;
          const lit = s < active;
          const g = gradientAtSeg(s);
          if (!lit) {
            el.className = `${baseSeg} shadow-none`;
            el.style.backgroundColor = `rgba(${g.r}, ${g.g}, ${g.b}, ${0.09 * A})`;
            el.style.boxShadow = "none";
            continue;
          }
          const boost = 0.38 + 0.58 * Math.pow(energy, 0.85);
          const c = {
            r: Math.min(255, Math.round(g.r * boost)),
            g: Math.min(255, Math.round(g.g * boost)),
            b: Math.min(255, Math.round(g.b * boost)),
          };
          el.className = baseSeg;
          el.style.backgroundColor = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.82 * A})`;
          el.style.boxShadow = `0 0 ${6 + energy * 9}px rgba(${c.r}, ${c.g}, ${c.b}, ${0.32 * A})`;
        }
      }

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
      className="pointer-events-none fixed left-0 top-1/2 z-[55] h-[5in] max-h-[5in] w-[2.125rem] -translate-y-1/2 sm:w-12 md:w-14"
      aria-hidden
    >
      <div className="flex h-full w-full flex-col gap-[2px] px-0.5 sm:px-1">
        {Array.from({ length: ROWS }).map((_, row) => (
          <div key={row} className="flex min-h-0 min-w-0 flex-1 flex-row gap-[2px]">
            {Array.from({ length: SEGMENTS }).map((_, seg) => {
              const g0 = gradientAtSeg(seg);
              return (
                <span
                  key={seg}
                  ref={(el) => {
                    if (!segmentRefs.current[row]) segmentRefs.current[row] = [];
                    segmentRefs.current[row][seg] = el;
                  }}
                  className={`${baseSeg} shadow-none`}
                  style={{
                    backgroundColor: `rgba(${g0.r}, ${g0.g}, ${g0.b}, ${0.07 * A})`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
