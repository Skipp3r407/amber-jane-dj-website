import { Resend } from "resend";
import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  venue?: string;
  guestCount?: string;
  message?: string;
};

function inboxTo() {
  return (
    process.env.PROJECT_INQUIRY_TO_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    site.email
  );
}

function fromAddress() {
  return (
    process.env.EMAIL_FROM ||
    process.env.RESEND_FROM ||
    `Amber Jane <onboarding@resend.dev>`
  );
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, eventType, eventDate, venue, guestCount, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email is not configured. Add RESEND_API_KEY to your environment (see .env.example).",
      },
      { status: 503 },
    );
  }

  const from = fromAddress();
  const to = inboxTo();

  const resend = new Resend(apiKey);

  const html = `
    <h2>New booking inquiry — ${site.name}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
    <p><strong>Event type:</strong> ${escapeHtml(eventType || "—")}</p>
    <p><strong>Event date:</strong> ${escapeHtml(eventDate || "—")}</p>
    <p><strong>Venue / location:</strong> ${escapeHtml(venue || "—")}</p>
    <p><strong>Guest count:</strong> ${escapeHtml(guestCount || "—")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `New inquiry from ${name} — ${eventType || "Event"}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
