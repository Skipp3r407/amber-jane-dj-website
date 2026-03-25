/**
 * Canonical list of Amber Jane’s public SoundCloud catalog for the Mixes page and Listen playlist.
 * Order: featured mixes first (matches home preview + #mix-1 … #mix-3), then remaining uploads/reposts.
 * Permalinks only — no tracking query strings.
 */

import type { MixEntry } from "@/data/mixTypes";

export type SoundcloudCatalogItem = {
  /** Stable id for anchors: /mixes#mix-{id} */
  id: string;
  title: string;
  description: string;
  genres: string[];
  duration: string;
  year: string;
  permalink: string;
  /** Shown in playlist card subtitle on the home Listen section */
  playlistSubtitle?: string;
};

export const SOUNDCLOUD_CATALOG: SoundcloudCatalogItem[] = [
  {
    id: "1",
    title: "Neon Pulse — Live Club Set",
    description: "Peak-hour house and tech — built for packed floors and late-night momentum.",
    genres: ["House", "Tech House"],
    duration: "58 min",
    year: "2025",
    permalink: "https://soundcloud.com/djamberjane1/in-this-moment",
    playlistSubtitle: "DJ Amber Jane",
  },
  {
    id: "2",
    title: "Sunset Sessions Vol. 4",
    description: "Melodic progressions and emotional builds — golden hour into night.",
    genres: ["Melodic", "Progressive"],
    duration: "62 min",
    year: "2025",
    permalink: "https://soundcloud.com/djamberjane1/aurora-in-her-soul-mizzo-tribute",
    playlistSubtitle: "Mizzo vocal breaks tribute",
  },
  {
    id: "3",
    title: "Wedding Mixtape — All Night Long",
    description: "Open-format energy: classics, singalongs, and dancefloor anthems.",
    genres: ["Open Format", "Party"],
    duration: "74 min",
    year: "2024",
    permalink: "https://soundcloud.com/djamberjane1/back-to-the-classics-with-dj-genesis",
    playlistSubtitle: "A DJ Genesis tribute",
  },
  {
    id: "4",
    title: "Feel the Breakz",
    description: "Spotlight energy — feel-good breaks for the floor.",
    genres: ["Breaks", "Party"],
    duration: "—",
    year: "—",
    permalink: "https://soundcloud.com/djamberjane1/rec016",
    playlistSubtitle: "DJ Amber Jane · breaks",
  },
  {
    id: "5",
    title: "Close Your Eyes!!",
    description: "Tribute set — classic energy with heart.",
    genres: ["Tribute", "Open Format"],
    duration: "—",
    year: "—",
    permalink: "https://soundcloud.com/djamberjane1/d7c1bdbb-3eb4-45ec-b894-68a8c678a88f",
    playlistSubtitle: "Tribute to DJ Genesis, BJ, & Fam",
  },
  {
    id: "6",
    title: "808 Familia Session Vol 1",
    description: "808 Familia session — reposted on Amber’s profile.",
    genres: ["Techno", "Rave"],
    duration: "—",
    year: "—",
    permalink: "https://soundcloud.com/shawn-smith-70/808-familia-session-vol-1",
    playlistSubtitle: "Techno_Rave850 · repost",
  },
  {
    id: "7",
    title: "I Bruise Easily",
    description: "Breakbeats — reposted on Amber’s profile.",
    genres: ["Breaks"],
    duration: "—",
    year: "—",
    permalink: "https://soundcloud.com/shawn-smith-70/i-bruise-easily",
    playlistSubtitle: "Techno_Rave850 · repost",
  },
];

export function catalogItemToMixEntry(item: SoundcloudCatalogItem): MixEntry {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    genres: item.genres,
    duration: item.duration,
    year: item.year,
    platform: "soundcloud",
    embedUrl: item.permalink,
    audioUrl: null,
  };
}

export const mixesFromCatalog: MixEntry[] = SOUNDCLOUD_CATALOG.map(catalogItemToMixEntry);
