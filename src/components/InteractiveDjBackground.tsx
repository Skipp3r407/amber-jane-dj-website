"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type InteractiveDjBackgroundProps = {
  className?: string;
};

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const COLORS = ["#FF3CAC", "#7B2CFF", "#00C2FF"] as const;

export function InteractiveDjBackground({ className }: InteractiveDjBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dots: Dot[] = [];
    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = reduce ? 20 : width > 1200 ? 50 : width > 760 ? 36 : 22;
      dots.length = 0;
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (reduce ? 0.05 : 0.16),
          vy: (Math.random() - 0.5) * (reduce ? 0.05 : 0.16),
          radius: Math.random() * 1.3 + 0.5,
          color: COLORS[i % COLORS.length]!,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    setSize();
    window.addEventListener("resize", setSize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const linkDistance = reduce ? 86 : 126;
      const mouseDistance = reduce ? 120 : 170;

      if (pointer.active && !reduce) {
        const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 220);
        halo.addColorStop(0, "rgba(255, 60, 172, 0.16)");
        halo.addColorStop(0.45, "rgba(123, 44, 255, 0.08)");
        halo.addColorStop(1, "rgba(0, 194, 255, 0)");
        ctx.fillStyle = halo;
        ctx.fillRect(pointer.x - 220, pointer.y - 220, 440, 440);
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]!;
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - dot.x;
          const dy = pointer.y - dot.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseDistance) {
            const pull = ((mouseDistance - dist) / mouseDistance) * (reduce ? 0.0004 : 0.0022);
            dot.vx += dx * pull;
            dot.vy += dy * pull;
          }
        }

        dot.vx *= 0.992;
        dot.vy *= 0.992;

        const cap = reduce ? 0.16 : 0.42;
        dot.vx = Math.max(-cap, Math.min(cap, dot.vx));
        dot.vy = Math.max(-cap, Math.min(cap, dot.vy));
      }

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]!;
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]!;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > linkDistance) continue;
          const alpha = (1 - dist / linkDistance) * (reduce ? 0.05 : 0.12);
          ctx.strokeStyle = `rgba(123, 44, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]!;
        ctx.beginPath();
        ctx.fillStyle = dot.color;
        ctx.shadowBlur = reduce ? 6 : 12;
        ctx.shadowColor = dot.color;
        ctx.globalAlpha = reduce ? 0.24 : 0.4;
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, [reduce]);

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[1] overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_20%_10%,rgba(123,44,255,0.2),transparent_56%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(0,194,255,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,60,172,0.05),rgba(123,44,255,0.06),rgba(0,194,255,0.04))]" />
      <canvas ref={canvasRef} className="h-full w-full opacity-80" />
    </div>
  );
}
