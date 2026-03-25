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
  /** Live analyser after first play (Web Audio). Null if not wired or unsupported. */
  getAnalyser: () => AnalyserNode | null;
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
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaWiredRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasAudio = Boolean(audioUrl?.trim());

  const getAnalyser = useCallback(() => analyserRef.current, []);

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

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !hasAudio) return;

    const wireAnalyser = async () => {
      if (mediaWiredRef.current) {
        await audioCtxRef.current?.resume().catch(() => {});
        return;
      }
      try {
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(el);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.45;
        analyser.minDecibels = -78;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        mediaWiredRef.current = true;
        await ctx.resume();
      } catch {
        /* Web Audio can fail in edge cases; EQ falls back to CSS animation */
      }
    };

    el.addEventListener("play", wireAnalyser);
    return () => {
      el.removeEventListener("play", wireAnalyser);
    };
  }, [hasAudio]);

  useEffect(() => {
    return () => {
      void audioCtxRef.current?.close();
      audioCtxRef.current = null;
      analyserRef.current = null;
      mediaWiredRef.current = false;
    };
  }, []);

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
      getAnalyser,
    }),
    [isPlaying, trackTitle, hasAudio, playLatest, toggle, getAnalyser],
  );

  return (
    <HomeMusicContext.Provider value={value}>
      {hasAudio ? (
        <audio ref={audioRef} src={audioUrl!} preload="none" playsInline className="hidden" aria-hidden />
      ) : null}
      {children}
    </HomeMusicContext.Provider>
  );
}
