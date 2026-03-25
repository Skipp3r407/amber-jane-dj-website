"use client";

import { useEffect, useRef, useState } from "react";

export type VisualizerMode = "auto" | "analyser" | "simulated";

export type UseVisualizerLevelsOptions = {
  barCount: number;
  isPlaying: boolean;
  getAnalyser: () => AnalyserNode | null;
  mode: VisualizerMode;
  intensity: number;
  reducedMotion: boolean;
};

function freqRange(barCount: number, row: number): readonly [number, number] {
  const fMin = 40;
  const fMax = 12000;
  const t0 = row / barCount;
  const t1 = (row + 1) / barCount;
  return [fMin * Math.pow(fMax / fMin, t0), fMin * Math.pow(fMax / fMin, t1)];
}

function binsForRange(
  fLow: number,
  fHigh: number,
  binCount: number,
  sampleRate: number,
): [number, number] {
  const nyquist = sampleRate / 2;
  const lo = Math.max(0, Math.min(binCount - 1, Math.floor((fLow / nyquist) * binCount)));
  const hi = Math.max(lo, Math.min(binCount - 1, Math.ceil((fHigh / nyquist) * binCount)));
  return [lo, hi];
}

/**
 * Smooth 0–1 levels per bar. Uses Web Audio when allowed and analyser exists;
 * otherwise staggered simulation (SoundCloud iframe–safe).
 */
export function useVisualizerLevels({
  barCount,
  isPlaying,
  getAnalyser,
  mode,
  intensity,
  reducedMotion,
}: UseVisualizerLevelsOptions): number[] {
  const [levels, setLevels] = useState(() => Array.from({ length: barCount }, () => 0.22));
  const smoothedRef = useRef<Float32Array>(new Float32Array(barCount));
  const phaseRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    smoothedRef.current = new Float32Array(barCount);
    setLevels(Array.from({ length: barCount }, () => 0.22));
  }, [barCount]);

  useEffect(() => {
    let stopped = false;
    const smoothed = smoothedRef.current;

    const tick = () => {
      if (stopped) return;
      const I = Math.max(0.15, Math.min(1.5, intensity));
      const next = new Array<number>(barCount);

      const analyser = getAnalyser();
      const useReal =
        mode !== "simulated" &&
        analyser !== null &&
        (mode === "analyser" || mode === "auto");
      const activeAnalyser = useReal && isPlaying && !reducedMotion;

      if (activeAnalyser) {
        const sr = analyser.context.sampleRate;
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < barCount; i++) {
          const [fLo, fHi] = freqRange(barCount, i);
          const [iLo, iHi] = binsForRange(fLo, fHi, data.length, sr);
          let sum = 0;
          for (let j = iLo; j <= iHi; j++) sum += data[j]!;
          const raw = sum / (iHi - iLo + 1) / 255;
          const target = Math.pow(Math.max(0, Math.min(1, raw * 1.2)), 0.85) * I;
          const diff = target - smoothed[i]!;
          smoothed[i]! += diff * (diff > 0 ? 0.42 : 0.12);
          next[i] = Math.max(0.08, Math.min(1, smoothed[i]!));
        }
      } else {
        const playBoost = isPlaying ? 1.15 : 0.55;
        const speed = isPlaying ? 0.022 : 0.01;
        phaseRef.current += reducedMotion ? 0 : speed;
        const p = phaseRef.current;
        for (let i = 0; i < barCount; i++) {
          const stagger = i * 0.38;
          const wobble =
            0.32 +
            0.38 *
              (0.5 +
                0.5 *
                  Math.sin(p * 0.65 + stagger) *
                  (0.72 + 0.28 * Math.sin(p * 0.14 + i * 0.11)));
          const target = Math.min(1, wobble * playBoost * I);
          const diff = target - smoothed[i]!;
          smoothed[i]! += diff * (diff > 0 ? 0.14 : 0.08);
          next[i] = reducedMotion ? 0.28 : Math.max(0.1, Math.min(1, smoothed[i]!));
        }
      }

      setLevels(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [
    barCount,
    isPlaying,
    getAnalyser,
    mode,
    intensity,
    reducedMotion,
  ]);

  return levels;
}
