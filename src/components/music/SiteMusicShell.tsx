"use client";

import type { ReactNode } from "react";
import { BackgroundRadioBars } from "@/components/BackgroundRadioBars";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { FloatingMusicPlayer } from "@/components/music/FloatingMusicPlayer";
import { HomeMusicProvider } from "@/components/music/HomeMusicProvider";

/** Shared env-based mix URL for site-wide player + EQ (same as home page). */
function mixEnv() {
  const audioUrl =
    process.env.NEXT_PUBLIC_LATEST_MIX_URL ?? process.env.NEXT_PUBLIC_MIX_DEMO_URL ?? null;
  const trackTitle =
    process.env.NEXT_PUBLIC_LATEST_MIX_TITLE ?? "Neon Pulse — Live Club Set";
  return { audioUrl, trackTitle };
}

const gutter = "pl-[4.25rem] sm:pl-24 md:pl-28";

export function SiteMusicShell({ children }: { children: ReactNode }) {
  const { audioUrl, trackTitle } = mixEnv();

  return (
    <HomeMusicProvider audioUrl={audioUrl} trackTitle={trackTitle}>
      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-24 z-[55] h-[min(48vh,400px)] w-[4.25rem] opacity-[0.35] sm:top-28 sm:h-[min(50vh,420px)] sm:w-24 md:top-32 md:h-[min(52vh,420px)] md:w-28"
          aria-hidden
        >
          <BackgroundRadioBars />
        </div>
        <Navbar className={gutter} />
        <main className={`relative z-10 ${gutter}`}>{children}</main>
        <Footer className={gutter} />
        <FloatingMusicPlayer />
        <ScrollToTopButton />
        <ChatWidget />
      </div>
    </HomeMusicProvider>
  );
}
