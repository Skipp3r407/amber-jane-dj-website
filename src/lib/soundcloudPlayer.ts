export type SoundCloudPlayerOptions = {
  /** When true, widget starts after load (use only after a user gesture, e.g. track click). */
  autoPlay?: boolean;
};

/**
 * SoundCloud widget URL — same pattern as the home Listen section (visual player).
 * Pass a canonical track permalink, e.g. https://soundcloud.com/djamberjane1/rec016
 */
export function buildSoundCloudPlayerSrc(trackUrl: string, options?: SoundCloudPlayerOptions) {
  const params = new URLSearchParams({
    url: trackUrl,
    color: "#ff5500",
    auto_play: options?.autoPlay ? "true" : "false",
    hide_related: "false",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    /** Hides the square artwork thumbnail so the bar matches light UI without a black box */
    show_artwork: "false",
    visual: "true",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
