/**
 * Home “Listen” section — built from the same catalog as the Mixes page.
 * Profile: https://soundcloud.com/djamberjane1
 */

import { SOUNDCLOUD_CATALOG } from "@/data/soundcloudCatalog";

export type SoundcloudPlaylistTrack = {
  id: string;
  title: string;
  subtitle?: string;
  soundcloudUrl: string;
  description?: string;
  /** Single line for MusicCard (e.g. "House / Tech House") */
  genreLine: string;
  duration: string;
  year: string;
};

export const SOUNDCLOUD_PLAYLIST: SoundcloudPlaylistTrack[] = SOUNDCLOUD_CATALOG.map((item) => ({
  id: item.id,
  title: item.title,
  subtitle: item.playlistSubtitle,
  soundcloudUrl: item.permalink,
  description: item.description,
  genreLine: item.genres.join(" / "),
  duration: item.duration,
  year: item.year,
}));

export const SOUNDCLOUD_PROFILE = "https://soundcloud.com/djamberjane1";
