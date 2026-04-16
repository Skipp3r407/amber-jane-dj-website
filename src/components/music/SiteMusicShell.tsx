"use client";

import type { ReactNode } from "react";
import { InteractiveDjBackground } from "@/components/InteractiveDjBackground";
import { TurntableCursor } from "@/components/TurntableCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { FloatingMusicPlayer } from "@/components/music/FloatingMusicPlayer";
import { HomeMusicProvider } from "@/components/music/HomeMusicProvider";

function mixEnv() {
  const audioUrl =
    process.env.NEXT_PUBLIC_LATEST_MIX_URL ?? process.env.NEXT_PUBLIC_MIX_DEMO_URL ?? null;
  const trackTitle =
    process.env.NEXT_PUBLIC_LATEST_MIX_TITLE ?? "Neon Pulse — Live Club Set";
  return { audioUrl, trackTitle };
}

export function SiteMusicShell({ children }: { children: ReactNode }) {
  const { audioUrl, trackTitle } = mixEnv();

  return (
    <HomeMusicProvider audioUrl={audioUrl} trackTitle={trackTitle}>
      <InteractiveDjBackground />
      <TurntableCursor />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <FloatingMusicPlayer />
      <ScrollToTopButton />
      <ChatWidget />
    </HomeMusicProvider>
  );
}
