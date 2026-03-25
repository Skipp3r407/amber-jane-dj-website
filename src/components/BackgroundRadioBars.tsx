"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useHomeMusic } from "@/components/music/HomeMusicProvider";

/** Horizontal bands stacked vertically; each band is segments left → right (level grows toward the right). */
const ROWS = 28;
const SEGMENTS = 16;

/** Site theme (matches tailwind `neon.*`). Top of strip → blue; bottom → pink. */
const RGB = {
  pink: { r: 255, g: 60, b: 172 },
  purple: { r: 123, g: 44, b: 255 },
  blue: { r: 0, g: 194, b: 255 },
} as const;

type RGBTriplet = { r: number; g: number; b: number };

function lerpRgb(a: RGBTriplet, b: RGBTriplet, t: number): RGBTriplet {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/** Row 0 = top (treble / cooler), last row = bottom (bass / warmer). */
function themeColorForRow(row: number): RGBTriplet {
  const t = row / Math.max(1, ROWS - 1);
  if (t <= 0.5) return lerpRgb(RGB.blue, RGB.purple, t * 2);
  return lerpRgb(RGB.purple, RGB.pink, (t - 0.5) * 2);
}

function scaleRgb(c: RGBTriplet, brightness: number): RGBTriplet {
  const k = Math.max(0.2, Math.min(1, brightness));
  return {
    r: Math.round(c.r * k),
    g: Math.round(c.g * k),
    b: Math.round(c.b * k),
  };
}

/** Same sweep as CTA buttons: `from-neon-pink` (left) → `to-neon-purple` (right). */
function buttonGradientAtSeg(seg: number): RGBTriplet {
  const t = seg / Math.max(1, SEGMENTS - 1);
  return lerpRgb(RGB.pink, RGB.purple, t);
}

/** Log-spaced frequency band for row `r` (bass at bottom rows). */
function freqRangeForRow(freqRow: number): readonly [number, number] {
  const fMin = 45;
  const fMax = 14000;
  const t0 = freqRow / ROWS;
  const t1 = (freqRow + 1) / ROWS;
  const fLow = fMin * Math.pow(fMax / fMin, t0);
  const fHigh = fMin * Math.pow(fMax / fMin, t1);
  return [fLow, fHigh];
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

const baseSeg = "h-full min-w-[2px] flex-1 rounded-[2px]";

function applySegment(
  el: HTMLSpanElement | null,
  lit: boolean,
  opts: { themed: boolean; row: number; seg: number; energy: number },
) {
  if (!el) return;
  const g = buttonGradientAtSeg(opts.seg);
  if (!lit) {
    el.className = `${baseSeg} shadow-none`;
    if (opts.themed) {
      el.style.backgroundColor = "rgba(123, 44, 255, 0.045)";
    } else {
      el.style.backgroundColor = `rgba(${g.r}, ${g.g}, ${g.b}, 0.075)`;
    }
    el.style.boxShadow = "none";
    return;
  }
  if (!opts.themed) {
    const c = scaleRgb(g, 0.36 + 0.52 * Math.pow(opts.energy, 0.85));
    el.className = baseSeg;
    el.style.backgroundColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.82)`;
    el.style.boxShadow =
      `0 0 8px rgba(255, 60, 172, 0.22), 0 0 18px rgba(123, 44, 255, 0.16), 0 0 26px rgba(123, 44, 255, 0.08)`;
    return;
  }
  const base = themeColorForRow(opts.row);
  const b = 0.32 + 0.58 * Math.pow(opts.energy, 0.9);
  const c = scaleRgb(base, b);
  const glow = 6 + opts.energy * 11;
  el.className = baseSeg;
  el.style.backgroundColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.88)`;
  el.style.boxShadow = `0 0 ${glow}px rgba(${c.r}, ${c.g}, ${c.b}, 0.32)`;
}

function smoothToward(current: number, target: number, attack: number, release: number): number {
  const diff = target - current;
  const k = diff > 0 ? attack : release;
  return current + diff * k;
}

/**
 * Left-edge EQ: transparent strip. Segments extend left→right per row; follows audio when playing.
 */
export function BackgroundRadioBars() {
  const { getAnalyser, isPlaying, hasAudio } = useHomeMusic();
  const reduce = useReducedMotion();
  const segmentRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const rafRef = useRef(0);
  const idlePhase = useRef(0);
  const smoothedRef = useRef<Float32Array>(new Float32Array(ROWS));

  const reactive = Boolean(hasAudio && isPlaying && !reduce);
  const themed = reactive;

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
          const n = iHi - iLo + 1;
          const raw = sum / n / 255;
          const shaped = Math.pow(Math.max(0, Math.min(1, raw * 1.15)), 0.88);
          targets[r] = smoothToward(smoothed[r]!, shaped, 0.48, 0.11);
          smoothed[r] = targets[r]!;
        }
      } else {
        idlePhase.current += reduce ? 0 : reactive ? 0.012 : 0.014;
        const p = idlePhase.current;
        for (let r = 0; r < ROWS; r++) {
          const wave =
            0.22 +
            0.52 *
              (0.5 +
                0.5 *
                  Math.sin(p * 0.42 + r * 0.21) *
                  (0.65 + 0.35 * Math.sin(p * 0.11 + r * 0.09)));
          const target = reduce ? 0.38 : wave;
          const s = smoothToward(smoothed[r]!, target, 0.09, 0.06);
          smoothed[r] = s;
          targets[r] = s;
        }
      }

      for (let r = 0; r < ROWS; r++) {
        const t = Math.max(0, Math.min(1, targets[r] ?? 0));
        const active = Math.round(t * SEGMENTS);
        const energy = Math.max(0, Math.min(1, smoothed[r] ?? 0));
        for (let s = 0; s < SEGMENTS; s++) {
          const el = segmentRefs.current[r]?.[s];
          applySegment(el, s < active, { themed, row: r, seg: s, energy });
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [reactive, getAnalyser, reduce, themed]);

  return (
    <div className="pointer-events-none h-full w-full bg-transparent">
      <div className="flex h-full w-full flex-col gap-[3px] bg-transparent px-1 sm:px-1.5">
        {Array.from({ length: ROWS }).map((_, row) => (
          <div
            key={row}
            className="flex min-h-0 min-w-0 flex-1 flex-row gap-[3px]"
          >
            {Array.from({ length: SEGMENTS }).map((_, seg) => {
              const g0 = buttonGradientAtSeg(seg);
              return (
              <span
                key={seg}
                ref={(el) => {
                  if (!segmentRefs.current[row]) segmentRefs.current[row] = [];
                  segmentRefs.current[row][seg] = el;
                }}
                className={`${baseSeg} shadow-none`}
                style={{ backgroundColor: `rgba(${g0.r}, ${g0.g}, ${g0.b}, 0.065)` }}
              />
            );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
