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
};

export const SOUNDCLOUD_PLAYLIST: SoundcloudPlaylistTrack[] = SOUNDCLOUD_CATALOG.map((item) => ({
  id: item.id,
  title: item.title,
  subtitle: item.playlistSubtitle,
  soundcloudUrl: item.permalink,
  description: item.description,
}));

export const SOUNDCLOUD_PROFILE = "https://soundcloud.com/djamberjane1";
