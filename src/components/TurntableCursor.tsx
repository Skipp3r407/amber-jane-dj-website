"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

const MAX_SPARKLES = 56;

export function TurntableCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const lastEmitRef = useRef(0);
  const lastRainRef = useRef(0);
  const hoveredSectionRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("turntable-cursor-active");
    return () => {
      document.documentElement.classList.remove("turntable-cursor-active");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let stop = false;

    const tick = () => {
      if (stop) return;
      setSparkles((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            vy: s.vy + 0.006,
            life: s.life - 0.025,
          }))
          .filter((s) => s.life > 0),
      );
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const emit = (x: number, y: number, mode: "trail" | "burst" | "rain" = "trail") => {
      if (reduce) return;
      const count = mode === "burst" ? 8 : mode === "rain" ? 4 : 3;
      const next = Array.from({ length: count }, (_, i) => {
        const rain = mode === "rain";
        const a = rain ? Math.PI / 2 + (Math.random() - 0.5) * 0.5 : Math.random() * Math.PI * 2;
        const speed =
          (mode === "burst" ? 1.4 : rain ? 0.35 : 0.8) +
          Math.random() * (mode === "burst" ? 0.8 : rain ? 0.45 : 0.7);
        return {
          id: idRef.current++,
          x: x + (i - count / 2) * 0.4,
          y,
          vx: rain ? (Math.random() - 0.5) * 0.45 : Math.cos(a) * speed,
          vy: rain ? 0.45 + Math.random() * 0.9 : Math.sin(a) * speed - 0.35,
          life: rain ? 0.9 : 1,
          size: 2 + Math.random() * (mode === "burst" ? 3.2 : rain ? 1.8 : 2.2),
        } satisfies Sparkle;
      });

      setSparkles((prev) => [...prev.slice(-MAX_SPARKLES + next.length), ...next]);
    };

    const onMove = (event: PointerEvent) => {
      setVisible(true);
      setPos({ x: event.clientX, y: event.clientY });
      const now = performance.now();
      if (now - lastEmitRef.current > 22) {
        emit(event.clientX, event.clientY, "trail");
        lastEmitRef.current = now;
      }

      const target = event.target as Element | null;
      const section = target?.closest("section");
      hoveredSectionRef.current = section ? section.getBoundingClientRect() : null;
      const rect = hoveredSectionRef.current;
      if (rect && now - lastRainRef.current > 95) {
        const rainX = rect.left + Math.random() * rect.width;
        const rainY = rect.top + 4 + Math.random() * 14;
        emit(rainX, rainY, "rain");
        lastRainRef.current = now;
      }
    };
    const onDown = (event: PointerEvent) => {
      emit(event.clientX, event.clientY, "burst");
    };
    const onLeave = () => {
      setVisible(false);
      hoveredSectionRef.current = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, reduce]);

  if (!enabled) return null;

  return (
    <>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none fixed z-[92] rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: Math.max(0, s.life * 0.8),
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,60,172,0.85) 35%, rgba(123,44,255,0.25) 100%)",
            boxShadow:
              "0 0 8px rgba(255,60,172,0.45), 0 0 14px rgba(123,44,255,0.35), 0 0 18px rgba(0,194,255,0.15)",
          }}
          aria-hidden
        />
      ))}
      <div
        className="pointer-events-none fixed z-[93] transition-opacity duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden
      >
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-pink/45 to-neon-purple/55 blur-md" />
          <div className="absolute inset-[3px] animate-spin rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_30%,rgba(70,70,85,0.95),rgba(8,8,10,0.96)_66%)] shadow-[0_0_14px_rgba(255,60,172,0.35),0_0_26px_rgba(123,44,255,0.32)] [animation-duration:2.2s] [animation-timing-function:linear]">
            <div className="absolute inset-[7px] rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 ring-2 ring-neon-purple/45" />
          </div>
          <div className="absolute right-[5px] top-[8px] h-[19px] w-[3px] rotate-[35deg] rounded-full bg-zinc-100/85 shadow-[0_0_8px_rgba(255,255,255,0.35)]" />
          <div className="absolute right-[11px] top-[20px] h-1.5 w-1.5 rounded-full bg-neon-pink shadow-[0_0_8px_rgba(255,60,172,0.7)]" />
        </div>
      </div>
    </>
  );
}
