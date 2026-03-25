/**
 * Mix entries for the Mixes page.
 * SoundCloud: `embedUrl` is the track permalink; the player uses the same widget as the home Listen section.
 * Spotify / Mixcloud: `embedUrl` is the full iframe `src` from the platform’s embed dialog.
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

export const mixes: MixEntry[] = [
  {
    id: "1",
    title: "Neon Pulse — Live Club Set",
    description: "Peak-hour house and tech — built for packed floors and late-night momentum.",
    genres: ["House", "Tech House"],
    duration: "58 min",
    year: "2025",
    platform: "soundcloud",
    embedUrl: "https://soundcloud.com/djamberjane1/in-this-moment",
    audioUrl: null,
  },
  {
    id: "2",
    title: "Sunset Sessions Vol. 4",
    description: "Melodic progressions and emotional builds — golden hour into night.",
    genres: ["Melodic", "Progressive"],
    duration: "62 min",
    year: "2025",
    platform: "soundcloud",
    embedUrl: "https://soundcloud.com/djamberjane1/aurora-in-her-soul-mizzo-tribute",
  },
  {
    id: "3",
    title: "Wedding Mixtape — All Night Long",
    description: "Open-format energy: classics, singalongs, and dancefloor anthems.",
    genres: ["Open Format", "Party"],
    duration: "74 min",
    year: "2024",
    platform: "soundcloud",
    embedUrl: "https://soundcloud.com/djamberjane1/back-to-the-classics-with-dj-genesis",
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
