export type SoundCloudPlayerOptions = {
  /** When true, widget starts after load (use only after a user gesture, e.g. track click). */
  autoPlay?: boolean;
  /**
   * `true` = large “visual” player (big artwork + prominent white waveform).
   * `false` = compact classic bar (minimal chrome) — preferred to avoid the full-screen style EQ look.
   */
  visual?: boolean;
};

/**
 * SoundCloud widget URL. Default is **non-visual** classic player so the site doesn’t show
 * SoundCloud’s large white waveform strip (that UI lives inside their iframe, not our code).
 */
export function buildSoundCloudPlayerSrc(trackUrl: string, options?: SoundCloudPlayerOptions) {
  const visual = options?.visual ?? false;
  const params = new URLSearchParams({
    url: trackUrl,
    color: "#ff5500",
    auto_play: options?.autoPlay ? "true" : "false",
    hide_related: "false",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_artwork: "false",
    visual: visual ? "true" : "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
