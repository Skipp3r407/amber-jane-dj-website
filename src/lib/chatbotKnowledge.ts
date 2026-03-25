import { site } from "@/lib/site";

export const CHAT_GREETING = `Hi, I'm Amber Jane's booking assistant 🎵 I can help with bookings, event types, availability, music questions, and quotes. What can I help you with?`;

export const PRICING_REPLY = `Pricing depends on the event type, location, timing, and set requirements — every quote is custom. The best next step is to send a booking inquiry (or your details here) so we can align on scope and follow up with availability.`;

export const knowledgeReplies: Record<string, string> = {
  "Event Types": `Amber DJs weddings, private parties, nightlife & clubs, corporate events, festivals, and special one-off experiences. Tell me what you're planning and I'll point you to the right format.`,
  "Music Style": `Sets range from open format to underground — house, dance, throwbacks, R&B, party anthems, chill lounge, and fully custom briefs. Share your vibe and must-plays.`,
  Pricing: PRICING_REPLY,
  Availability: `The calendar moves fast — especially weekends. Send your date and city and we'll confirm availability or suggest close alternatives. Early booking wins in peak season.`,
  Contact: `Reach ${site.email} or ${site.phone}. The contact page has the full inquiry form — fastest for quotes.`,
};

/** Free-text keyword hints → canned answer */
export const matcherTopics: { test: RegExp; reply: string }[] = [
  {
    test: /wedding/i,
    reply: `Yes — weddings are a core format: ceremony undertones, cocktail, reception, and a dance floor that builds naturally. Share your date + venue for next steps.`,
  },
  {
    test: /travel|destination/i,
    reply: `Travel is available for regional and destination events. Include city + date in your inquiry so logistics can be quoted cleanly.`,
  },
  {
    test: /price|cost|how much|pricing|quote/i,
    reply: PRICING_REPLY,
  },
  {
    test: /availability|available|book|booking|date/i,
    reply: `Send your preferred date, city, and event type — we'll confirm availability or suggest alternatives. Peak weekends move quickly.`,
  },
  {
    test: /genre|style|music|playlist|song/i,
    reply: `Genres are tailored to your crowd — open format, house, dance, throwbacks, R&B, and more. Must-plays and do-not-plays are welcome.`,
  },
  {
    test: /mix|listen|soundcloud/i,
    reply: `Check the Mixes page for embeds and audio. If you want a specific vibe match for your event, mention it in your inquiry.`,
  },
  {
    test: /corporate|company|launch/i,
    reply: `Corporate events are a focus — polished sound, brand-safe energy, and smooth coordination with AV and planners.`,
  },
];
