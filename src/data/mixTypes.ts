/**
 * Shared types for mix listings (Mixes page, embeds, home preview).
 */
export type MixPlatform = "soundcloud" | "spotify" | "mixcloud" | "audio" | "placeholder";

export type MixEntry = {
  id: string;
  title: string;
  description: string;
  genres: string[];
  duration: string;
  year: string;
  platform: MixPlatform;
  /** SoundCloud: canonical track URL. Spotify/Mixcloud: full iframe embed URL. */
  embedUrl: string | null;
  /** Optional direct MP3 for fallback player */
  audioUrl?: string | null;
};
