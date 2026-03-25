"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type HomeMusicContextValue = {
  isPlaying: boolean;
  trackTitle: string;
  hasAudio: boolean;
  playLatest: () => Promise<void>;
  toggle: () => Promise<void>;
};

const HomeMusicContext = createContext<HomeMusicContextValue | null>(null);

export function useHomeMusic() {
  const ctx = useContext(HomeMusicContext);
  if (!ctx) {
    throw new Error("useHomeMusic must be used within HomeMusicProvider");
  }
  return ctx;
}

type HomeMusicProviderProps = {
  children: ReactNode;
  audioUrl: string | null;
  trackTitle: string;
};

export function HomeMusicProvider({ children, audioUrl, trackTitle }: HomeMusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasAudio = Boolean(audioUrl?.trim());

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [hasAudio]);

  const playLatest = useCallback(async () => {
    const el = audioRef.current;
    if (!el || !hasAudio) return;
    try {
      el.volume = 0.92;
      await el.play();
    } catch {
      setIsPlaying(false);
    }
  }, [hasAudio]);

  const toggle = useCallback(async () => {
    const el = audioRef.current;
    if (!el || !hasAudio) return;
    try {
      if (el.paused) {
        el.volume = 0.92;
        await el.play();
      } else {
        el.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  }, [hasAudio]);

  const value = useMemo(
    () => ({
      isPlaying,
      trackTitle,
      hasAudio,
      playLatest,
      toggle,
    }),
    [isPlaying, trackTitle, hasAudio, playLatest, toggle],
  );

  return (
    <HomeMusicContext.Provider value={value}>
      {/* preload="none": no fetch until user plays — keeps first paint light */}
      {hasAudio ? (
        <audio ref={audioRef} src={audioUrl!} preload="none" playsInline className="hidden" aria-hidden />
      ) : null}
      {children}
    </HomeMusicContext.Provider>
  );
}
