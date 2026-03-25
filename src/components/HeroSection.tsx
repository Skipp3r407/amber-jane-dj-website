"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Waveform } from "@/components/Waveform";

const trustChips = [
  "Private Events",
  "Weddings",
  "Nightlife",
  "Custom Sets",
  "Professional DJ",
] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[120%] w-[150%] animate-gradient-shift bg-[length:200%_200%] opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255,60,172,0.22), rgba(123,44,255,0.18), rgba(0,194,255,0.18))",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">
            Professional DJ · Live Events
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turn Up the Energy
            <span className="mt-1 block text-gradient-live">with Amber Jane</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Premium DJ experience for private parties, nightlife, weddings, and corporate events
            — custom sets, polished sound, and a dance floor that stays electric.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Event specialties">
            {trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/5"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 text-sm font-semibold text-white shadow-neon transition hover:scale-[1.02] hover:brightness-110"
            >
              Book Now
            </Link>
            <Link
              href="/mixes"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:scale-[1.02] hover:border-neon-blue/50 hover:bg-white/10"
            >
              Listen to a Mix
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Custom quotes · Fast replies · Travel on request
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-pink/25 via-midnight/40 to-neon-blue/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="https://images.unsplash.com/photo-1571266028243-e473f8d7f4d8?auto=format&fit=crop&w=900&q=80"
              alt="DJ at the decks with lights and crowd energy"
              width={900}
              height={700}
              className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[420px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-night/75 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  In the mix
                </p>
                <p className="font-display text-sm text-foreground">Amber Jane</p>
              </div>
              <Waveform className="h-10 w-28 opacity-90" bars={20} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
