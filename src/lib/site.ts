export const site = {
  name: "Amber Jane",
  title: "Amber Jane | Professional DJ for Private Events, Parties & Nightlife",
  description:
    "Premium DJ for weddings, private parties, nightlife, and corporate events. Custom sets, polished production, and unforgettable energy — book Amber Jane.",
  url: "https://amberjanedj.com",
  locale: "en_US",
  keywords: [
    "Amber Jane",
    "DJ",
    "wedding DJ",
    "private event DJ",
    "nightlife DJ",
    "corporate event DJ",
    "club DJ",
    "music entertainment",
    "book a DJ",
  ],
  email: "bookings@amberjanedj.com",
  phone: "+1 (555) 014-9090",
  city: "Your City",
  region: "Your Region",
  /** Replace with real URLs — shown in footer & contact */
  social: {
    instagram: "https://instagram.com/",
    soundcloud: "https://soundcloud.com/",
    spotify: "https://open.spotify.com/",
    mixcloud: "https://www.mixcloud.com/",
  },
  /** Footer design credit */
  credit: {
    designer: "Elevate Digital Studio",
    href: "https://elevatedigitalstudios.net/",
  },
};

export function buildKeywords(extra: string[] = []) {
  return [...site.keywords, ...extra].join(", ");
}
