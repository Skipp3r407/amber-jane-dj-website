"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SOUNDCLOUD_PLAYLIST, SOUNDCLOUD_PROFILE } from "@/data/soundcloudPlaylist";

function buildEmbedSrc(trackUrl: string) {
  const params = new URLSearchParams({
    url: trackUrl,
    color: "#ff5500",
    auto_play: "false",
    hide_related: "false",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    visual: "true",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function MusicPlaylist() {
  const reduce = useReducedMotion();
  const playerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = SOUNDCLOUD_PLAYLIST[selectedIndex]!;
  const embedSrc = buildEmbedSrc(selected.soundcloudUrl);

  const scrollToPlayer = useCallback(() => {
    if (typeof window === "undefined" || !playerRef.current) return;
    if (window.matchMedia("(min-width: 768px)").matches) return;
    playerRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [reduce]);

  const selectTrack = useCallback(
    (index: number) => {
      setSelectedIndex(index);
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

      <motion.div
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">SoundCloud</p>
          <h2
            id="listen-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Listen
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:mx-0">
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
          </p>
        </div>

        <p className="mt-2 text-center text-xs text-zinc-500 md:text-left">
          Tap a track to load the player — audio only starts when you press play on the SoundCloud
          widget (no autoplay).
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SOUNDCLOUD_PLAYLIST.map((track, index) => {
            const active = index === selectedIndex;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => selectTrack(index)}
                  className={[
                    "group relative w-full rounded-2xl border p-4 text-left transition duration-300",
                    active
                      ? "border-neon-pink/50 bg-midnight/60 shadow-[0_0_28px_rgba(255,60,172,0.12)] ring-1 ring-neon-pink/40"
                      : "border-white/10 bg-night/40 hover:border-neon-purple/35 hover:bg-midnight/40 hover:shadow-[0_0_24px_rgba(123,44,255,0.08)]",
                  ].join(" ")}
                  aria-pressed={active}
                  aria-current={active ? "true" : undefined}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 ${
                      active ? "opacity-100" : ""
                    }`}
                    style={{
                      background:
                        "radial-gradient(120% 80% at 50% 0%, rgba(255,60,172,0.08), transparent 55%)",
                    }}
                  />
                  <span className="relative flex items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="font-display text-sm font-semibold leading-snug text-foreground sm:text-base">
                        {track.title}
                      </span>
                      {track.subtitle ? (
                        <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-neon-blue/90">
                          {track.subtitle}
                        </span>
                      ) : null}
                      {track.description ? (
                        <span className="mt-1 block text-xs leading-relaxed text-muted">
                          {track.description}
                        </span>
                      ) : null}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                        active
                          ? "bg-gradient-to-br from-neon-pink to-neon-purple text-white shadow-neon"
                          : "bg-white/10 text-zinc-300 group-hover:bg-white/15"
                      }`}
                      aria-hidden
                    >
                      ▶
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href={SOUNDCLOUD_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:border-neon-blue/40 hover:bg-white/10"
          >
            View Full SoundCloud
          </Link>
          <p className="text-center text-xs text-zinc-500 sm:text-right">
            Follow for drops, tributes, and live recordings.
          </p>
        </div>

        <div
          ref={playerRef}
          id="soundcloud-player-anchor"
          className="mt-10 scroll-mt-24 rounded-2xl border border-white/10 bg-night/60 p-3 shadow-[0_0_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-md sm:p-4"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-neon-blue">Player</p>
            <p className="truncate font-display text-sm text-foreground sm:text-base">{selected.title}</p>
          </div>
          <div className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
            <iframe
              key={embedSrc}
              title={`SoundCloud — ${selected.title}`}
              width="100%"
              height={420}
              scrolling="no"
              frameBorder="no"
              allow="autoplay; clipboard-write"
              src={embedSrc}
              className="block min-h-[280px] w-full bg-black sm:min-h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
