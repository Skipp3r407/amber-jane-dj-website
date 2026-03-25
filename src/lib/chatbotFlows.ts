import { site } from "@/lib/site";

export type LeadStep =
  | "type"
  | "date"
  | "location"
  | "guests"
  | "vibe"
  | "contact"
  | null;

export const leadPrompts: Record<Exclude<LeadStep, null>, string> = {
  type: `What type of event is it? (e.g. wedding, private party, club, corporate)`,
  date: `What date are you looking for (or a rough timeframe)?`,
  location: `Where is the event — city / venue?`,
  guests: `Roughly how many guests are expected?`,
  vibe: `What kind of vibe or music direction are you aiming for?`,
  contact: `What's the best name, email, and phone number to reach you?`,
};

export function leadSummary(data: {
  eventType: string;
  date: string;
  location: string;
  guests: string;
  vibe: string;
  contact: string;
}) {
  return `Thanks — here's what I captured:
• Event: ${data.eventType || "—"}
• Date: ${data.date || "—"}
• Location: ${data.location || "—"}
• Guests: ${data.guests || "—"}
• Vibe / music: ${data.vibe || "—"}
• Contact: ${data.contact || "—"}

Send this through the contact form for a formal quote, or email ${site.email} with the same details.`;
}
