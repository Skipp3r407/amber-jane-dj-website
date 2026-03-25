export type EventTag =
  | "Upcoming"
  | "Booked"
  | "Past Event"
  | "Public Event"
  | "Private Event";

export type CalendarEvent = {
  id: string;
  title: string;
  location: string;
  dateLabel: string;
  /** ISO date for sorting when available */
  sortDate?: string;
  highlight: string;
  tags: EventTag[];
};

export const upcomingEvents: CalendarEvent[] = [
  {
    id: "u1",
    title: "District Saturdays — Main Room",
    location: "City Center",
    dateLabel: "Mar 2026",
    sortDate: "2026-03-15",
    highlight: "Hold requested — inquire for similar dates",
    tags: ["Upcoming", "Public Event", "Booked"],
  },
  {
    id: "u2",
    title: "Corporate Summit Afterparty",
    location: "Convention District",
    dateLabel: "Apr 2026",
    sortDate: "2026-04-02",
    highlight: "Private — custom open format",
    tags: ["Upcoming", "Private Event", "Booked"],
  },
];

export const pastEvents: CalendarEvent[] = [
  {
    id: "p1",
    title: "Pulse District — Main Room",
    location: "City Center",
    dateLabel: "Feb 2025",
    highlight: "Sold-out Saturday headline",
    tags: ["Past Event", "Public Event"],
  },
  {
    id: "p2",
    title: "Skyline Rooftop Series",
    location: "Harbor District",
    dateLabel: "Summer 2024",
    highlight: "Sunset open-air set",
    tags: ["Past Event", "Public Event"],
  },
  {
    id: "p3",
    title: "Electric Garden Festival",
    location: "Regional Fairgrounds",
    dateLabel: "Aug 2024",
    highlight: "Stage takeover — 4K crowd",
    tags: ["Past Event", "Public Event"],
  },
  {
    id: "p4",
    title: "Private Estate Wedding",
    location: "Wine Country",
    dateLabel: "Jun 2024",
    highlight: "Ceremony through last song",
    tags: ["Past Event", "Private Event"],
  },
];
