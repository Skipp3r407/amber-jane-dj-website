/**
 * SoundCloud widget URL — same pattern as the home Listen section (visual player).
 * Pass a canonical track permalink, e.g. https://soundcloud.com/djamberjane1/rec016
 */
export function buildSoundCloudPlayerSrc(trackUrl: string) {
  const params = new URLSearchParams({
    url: trackUrl,
    color: "#ff5500",
    auto_play: "false",
    hide_related: "false",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    visual: "true",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
