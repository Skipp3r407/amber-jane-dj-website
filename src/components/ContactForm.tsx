"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const eventTypes = [
  "Wedding",
  "Private Party",
  "Nightlife / Club",
  "Corporate",
  "Festival / Outdoor",
  "Special Event",
  "Other",
];

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      venue: (form.elements.namedItem("venue") as HTMLInputElement).value,
      guestCount: (form.elements.namedItem("guestCount") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  const field =
    "mt-2 w-full rounded-xl border border-white/10 bg-night px-4 py-3 text-sm text-foreground outline-none transition focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/30";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-ink/80 p-6 shadow-xl shadow-black/40 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@email.com"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="(555) 000-0000" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Event type
          </span>
          <select name="eventType" required className={field} defaultValue="">
            <option value="" disabled>
              Select event type
            </option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Event date
          </span>
          <input name="eventDate" type="date" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Venue / location
          </span>
          <input
            name="venue"
            autoComplete="street-address"
            className={field}
            placeholder="City, venue name, or general area"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Guest count
          </span>
          <input
            name="guestCount"
            inputMode="numeric"
            className={field}
            placeholder="Approximate number of guests"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Message
          </span>
          <textarea
            name="message"
            required
            rows={4}
            className={field}
            placeholder="Tell us about your event, vibe, must-plays, and timeline."
          />
        </label>
      </div>

      {status === "success" ? (
        <p className="mt-6 rounded-xl border border-neon-blue/30 bg-neon-blue/10 px-4 py-3 text-sm text-neon-blue">
          Thanks — your inquiry is in. We typically reply within 1–2 business days with availability
          and next steps.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-neon-pink to-neon-purple py-3 font-semibold text-white shadow-neon transition hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? "Sending…" : "Send inquiry"}
      </button>
    </motion.form>
  );
}
