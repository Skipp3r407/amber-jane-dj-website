/**
 * Mix entries for the Mixes page — sourced from `soundcloudCatalog` (all public SoundCloud tracks in scope).
 */
import { mixesFromCatalog } from "@/data/soundcloudCatalog";

export type { MixEntry, MixPlatform } from "@/data/mixTypes";

export const mixes = mixesFromCatalog;

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
