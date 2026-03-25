"use client";

import { cn } from "@/lib/utils";

type WaveformProps = {
  active?: boolean;
  className?: string;
  bars?: number;
};

export function Waveform({ active = true, className, bars = 24 }: WaveformProps) {
  return (
    <div
      className={cn("flex h-10 items-end justify-center gap-0.5", className)}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="waveform-bar h-full max-h-[80%] origin-bottom"
          style={{
            animationDelay: `${i * 45}ms`,
            opacity: active ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}
