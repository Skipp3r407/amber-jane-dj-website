/**
 * Mix & embed configuration — paste SoundCloud / Spotify / Mixcloud embed URLs when ready.
 * Spotify: use open.spotify.com/embed/... URLs
 * SoundCloud: use w.soundcloud.com/player/?url=... or share embed src from SoundCloud
 * Mixcloud: use widget iframe src from Mixcloud embed code
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
  /** Full iframe src or Spotify/SoundCloud embed URL */
  embedUrl: string | null;
  /** Optional direct MP3 for fallback player */
  audioUrl?: string | null;
};

export const mixes: MixEntry[] = [
  {
    id: "1",
    title: "Neon Pulse — Live Club Set",
    description: "Peak-hour house and tech — built for packed floors and late-night momentum.",
    genres: ["House", "Tech House"],
    duration: "58 min",
    year: "2025",
    platform: "placeholder",
    embedUrl: null,
    audioUrl: null,
  },
  {
    id: "2",
    title: "Sunset Sessions Vol. 4",
    description: "Melodic progressions and emotional builds — golden hour into night.",
    genres: ["Melodic", "Progressive"],
    duration: "62 min",
    year: "2025",
    platform: "placeholder",
    embedUrl: null,
  },
  {
    id: "3",
    title: "Wedding Mixtape — All Night Long",
    description: "Open-format energy: classics, singalongs, and dancefloor anthems.",
    genres: ["Open Format", "Party"],
    duration: "74 min",
    year: "2024",
    platform: "placeholder",
    embedUrl: null,
  },
];

export const signatureGenres = [
  "Open Format",
  "House",
  "Dance",
  "Throwbacks",
  "R&B",
  "Party Anthems",
  "Chill Lounge",
  "Custom Event Sets",
] as const;
