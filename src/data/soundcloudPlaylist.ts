/**
 * SoundCloud playlist for the site player.
 * Profile: https://soundcloud.com/djamberjane1
 *
 * URLs are canonical permalinks (no ?si= / utm_ query strings) for reliable embeds.
 */

export type SoundcloudPlaylistTrack = {
  id: string;
  title: string;
  subtitle?: string;
  soundcloudUrl: string;
  description?: string;
};

export const SOUNDCLOUD_PLAYLIST: SoundcloudPlaylistTrack[] = [
  {
    id: "feel-the-breakz",
    title: "Feel the Breakz",
    subtitle: "DJ Amber Jane · breaks",
    soundcloudUrl: "https://soundcloud.com/djamberjane1/rec016",
    description: "Spotlight energy — feel-good breaks for the floor.",
  },
  {
    id: "close-your-eyes-tribute",
    title: "Close Your Eyes!!",
    subtitle: "Tribute to DJ Genesis, BJ, & Fam",
    soundcloudUrl: "https://soundcloud.com/djamberjane1/d7c1bdbb-3eb4-45ec-b894-68a8c678a88f",
    description: "Tribute set — classic energy with heart.",
  },
  {
    id: "in-this-moment",
    title: "In This Moment",
    subtitle: "DJ Amber Jane",
    soundcloudUrl: "https://soundcloud.com/djamberjane1/in-this-moment",
    description: "Original — melodic lift and dancefloor drive.",
  },
  {
    id: "back-to-the-classics",
    title: "All The Vibes, Back to the Classic's",
    subtitle: "A DJ Genesis tribute",
    soundcloudUrl: "https://soundcloud.com/djamberjane1/back-to-the-classics-with-dj-genesis",
    description: "Tribute mix — classics-forward programming.",
  },
  {
    id: "aurora-mizzo-tribute",
    title: "The Aurora of my Soul",
    subtitle: "Mizzo vocal breaks tribute",
    soundcloudUrl: "https://soundcloud.com/djamberjane1/aurora-in-her-soul-mizzo-tribute",
    description: "Vocal breaks tribute — soulful peaks and momentum.",
  },
  {
    id: "808-familia-vol-1",
    title: "808 Familia Session Vol 1",
    subtitle: "Techno_Rave850 · repost",
    soundcloudUrl: "https://soundcloud.com/shawn-smith-70/808-familia-session-vol-1",
    description: "808 Familia session — from the Recent feed.",
  },
  {
    id: "i-bruise-easily",
    title: "I Bruise Easily",
    subtitle: "Techno_Rave850 · repost",
    soundcloudUrl: "https://soundcloud.com/shawn-smith-70/i-bruise-easily",
    description: "Breakbeats — reposted on Amber’s profile.",
  },
];

export const SOUNDCLOUD_PROFILE = "https://soundcloud.com/djamberjane1";
