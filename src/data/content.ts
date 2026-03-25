export const services = [
  {
    title: "Private Parties",
    description:
      "Birthdays, celebrations, and VIP gatherings — a tailored vibe, seamless transitions, and a dance floor that stays lit.",
    audience: "Hosts who want a curated night without the playlist stress.",
    icon: "spark",
  },
  {
    title: "Weddings",
    description:
      "From ceremony undertones to the last dance — elegant pacing, crowd reading, and a reception that feels effortless.",
    audience: "Couples who want energy without chaos.",
    icon: "rings",
  },
  {
    title: "Nightlife & Clubs",
    description:
      "Peak-hour programming, tension and release, and mixes built for rooms that expect more.",
    audience: "Venues, promoters, and nightlife brands.",
    icon: "vinyl",
  },
  {
    title: "Corporate Events",
    description:
      "Brand-safe energy for launches, galas, and team moments — polished sound and smooth MC handoffs.",
    audience: "Planners who need reliability and style.",
    icon: "stage",
  },
  {
    title: "Special Events",
    description:
      "Product drops, fashion, fundraisers, and one-off experiences — custom formats and memorable peaks.",
    audience: "Teams who need a flexible creative partner.",
    icon: "spark",
  },
  {
    title: "Custom DJ Sets",
    description:
      "Genre-focused, era-specific, or fully bespoke — built around your brief, your crowd, and your must-play moments.",
    audience: "Anyone who wants a set that feels one-of-one.",
    icon: "vinyl",
  },
] as const;

/** Legacy shape for MusicCard on home — detailed mixes live in data/mixes.ts */
export const mixesPreview = [
  {
    id: "1",
    title: "Neon Pulse — Live Club Set",
    genre: "House / Tech House",
    duration: "58 min",
    year: "2025",
  },
  {
    id: "2",
    title: "Sunset Sessions Vol. 4",
    genre: "Melodic / Progressive",
    duration: "62 min",
    year: "2025",
  },
  {
    id: "3",
    title: "Wedding Mixtape — All Night Long",
    genre: "Open Format",
    duration: "74 min",
    year: "2024",
  },
] as const;

export const testimonials = [
  {
    quote:
      "The energy was unreal — she read the room instantly and kept everyone engaged. Transitions were silky and the vibe was exactly what we wanted.",
    name: "Jordan & Alex M.",
    role: "Wedding — Downtown Loft",
  },
  {
    quote:
      "Professional, easy to work with, and the dance floor didn’t clear once. Our launch felt like a headline night.",
    name: "Priya S.",
    role: "Brand Event Director",
  },
  {
    quote:
      "She brought the perfect balance of polish and party. Crowd control, song selection, pacing — all on point.",
    name: "Marcus T.",
    role: "Venue Manager",
  },
] as const;

/** Home / events preview strip — full calendar in data/eventsCalendar.ts */
export const events = [
  {
    title: "Pulse District — Main Room",
    location: "City Center",
    date: "Feb 2025",
    highlight: "Sold-out Saturday headline",
  },
  {
    title: "Skyline Rooftop Series",
    location: "Harbor District",
    date: "Summer 2024",
    highlight: "Sunset open-air set",
  },
  {
    title: "Electric Garden Festival",
    location: "Regional Fairgrounds",
    date: "Aug 2024",
    highlight: "Stage takeover — 4K crowd",
  },
  {
    title: "Private Estate Wedding",
    location: "Wine Country",
    date: "Jun 2024",
    highlight: "Ceremony through last song",
  },
] as const;

export const whyBook = [
  {
    title: "Reads the Crowd",
    body: "Sets that breathe with the room — momentum when it matters, restraint when it counts.",
  },
  {
    title: "Professional & Reliable",
    body: "Clear communication, on-time load-in, and backup planning so you’re never guessing.",
  },
  {
    title: "Custom-Tailored Sets",
    body: "Must-plays, do-not-plays, and genre direction — your night, shaped with intent.",
  },
  {
    title: "High-Energy Experience",
    body: "Big moments without chaos — a dance floor that feels electric, not forced.",
  },
  {
    title: "Stylish Brand Presence",
    body: "A polished look at the decks that matches premium venues and upscale events.",
  },
  {
    title: "Smooth Event Flow",
    body: "Works seamlessly with planners, vendors, and venues — low drama, high impact.",
  },
] as const;

export const faqItems = [
  {
    q: "What types of events do you DJ?",
    a: "Weddings, private parties, nightlife and club nights, corporate events, festivals, and special one-off experiences. Sets are adapted to the format and crowd.",
  },
  {
    q: "Do you travel for events?",
    a: "Yes — regional and destination bookings are common. Travel and lodging can be included in a custom quote.",
  },
  {
    q: "How far in advance should I book?",
    a: "Peak weekends fill early. Reach out as soon as you have a date in mind — short-notice may be possible depending on the calendar.",
  },
  {
    q: "Do you customize playlists?",
    a: "Absolutely. Share must-plays, do-not-plays, and the vibe you want. Sets are built around your brief and the room.",
  },
  {
    q: "Can you DJ weddings and private parties?",
    a: "Yes — both are core formats. Reception pacing, cocktail energy, and late-night peaks are all part of the package.",
  },
  {
    q: "Do you accept special requests?",
    a: "Yes, when they fit the flow of the night. For weddings and private events, we’ll align on key moments ahead of time.",
  },
  {
    q: "How do I get pricing?",
    a: "Pricing depends on event type, location, timing, and production needs. Send a booking inquiry for a custom quote — no fixed packages posted online.",
  },
  {
    q: "How do I check availability?",
    a: "Use the contact form or Amber Assistant with your date and city. You’ll get a clear yes/no or alternative options.",
  },
  {
    q: "What information do you need for a quote?",
    a: "Event type, date, location, approximate guest count, hours needed, and any production or genre notes. The more context, the faster the quote.",
  },
] as const;
