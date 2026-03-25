"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { SOUNDCLOUD_PLAYLIST, SOUNDCLOUD_PROFILE } from "@/data/soundcloudPlaylist";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { revealVariantFromIndex } from "@/lib/revealVariants";
import { buildSoundCloudPlayerSrc } from "@/lib/soundcloudPlayer";
import { MusicCard } from "@/components/MusicCard";

export function MusicPlaylist() {
  const reduce = useReducedMotion();
  const playerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  /** After a track click, load the widget with auto_play so playback starts from the user gesture. */
  const [userStartedPlayback, setUserStartedPlayback] = useState(false);
  /** Bumps iframe remount when re-selecting the same track (replay). */
  const [loadNonce, setLoadNonce] = useState(0);

  const selected = SOUNDCLOUD_PLAYLIST[selectedIndex]!;
  const embedSrc = buildSoundCloudPlayerSrc(selected.soundcloudUrl, {
    autoPlay: userStartedPlayback,
  });

  const scrollToPlayer = useCallback(() => {
    if (typeof window === "undefined" || !playerRef.current) return;
    if (window.matchMedia("(min-width: 768px)").matches) return;
    playerRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [reduce]);

  const selectTrack = useCallback(
    (index: number) => {
      setUserStartedPlayback(true);
      setSelectedIndex(index);
      setLoadNonce((n) => n + 1);
      requestAnimationFrame(() => {
        scrollToPlayer();
      });
    },
    [scrollToPlayer],
  );

  return (
    <section
      className="relative overflow-hidden border-b border-white/5 py-16 sm:py-24"
      aria-labelledby="listen-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(123,44,255,0.12),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal variant="down">
          <SectionHeading
            headingId="listen-heading"
            className="text-center md:text-left"
            eyebrow="SoundCloud"
            eyebrowClassName="text-white/85"
            title="Listen to"
            titleGradient="the catalog"
            subtitle={
              <>
                Mixes, tributes, and reposts from{" "}
                <a
                  href={SOUNDCLOUD_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue underline-offset-2 hover:underline"
                >
                  Amber Jane on SoundCloud
                </a>
                — including collaborator uploads where tracks live on their pages.
              </>
            }
          />
        </SectionReveal>

        <SectionReveal variant="up" delay={0.04} className="mt-2 block text-center text-xs text-zinc-500 md:text-left">
          Tap <span className="text-zinc-400">Play</span> on a card to load the player — audio starts
          once the SoundCloud widget loads (nothing autoplays until you choose a track).
        </SectionReveal>

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 md:grid-cols-3 md:items-stretch">
          {SOUNDCLOUD_PLAYLIST.map((track, index) => {
            const active = index === selectedIndex;
            return (
              <SectionReveal
                key={track.id}
                as="li"
                variant={revealVariantFromIndex(index)}
                delay={index * 0.04}
                className="h-full min-h-0"
              >
                <MusicCard
                  className="h-full"
                  title={track.title}
                  genre={track.genreLine}
                  duration={track.duration}
                  year={track.year}
                  playlistMode
                  selected={active}
                  onSelect={() => selectTrack(index)}
                />
              </SectionReveal>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <SectionReveal variant="left" className="w-full sm:w-auto">
            <Link
              href={SOUNDCLOUD_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:border-neon-blue/40 hover:bg-white/10 sm:w-auto"
            >
              View Full SoundCloud
            </Link>
          </SectionReveal>
          <SectionReveal variant="right" delay={0.05} className="text-center text-xs text-zinc-500 sm:text-right">
            Follow for drops, tributes, and live recordings.
          </SectionReveal>
        </div>

        <SectionReveal variant="up" delay={0.06} className="mt-10 block">
          <div
            ref={playerRef}
            id="soundcloud-player-anchor"
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-night/60 p-3 shadow-[0_0_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-md sm:p-4"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-neon-blue">Player</p>
              <p className="truncate font-display text-sm text-foreground sm:text-base">{selected.title}</p>
            </div>
            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
              <iframe
                key={`${selectedIndex}-${loadNonce}`}
                title={`SoundCloud — ${selected.title}`}
                width="100%"
                height={166}
                scrolling="no"
                frameBorder="no"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                src={embedSrc}
                className="block h-[166px] w-full bg-black"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
