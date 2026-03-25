"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { QuickReplies } from "@/components/chat/QuickReplies";
import {
  CHAT_GREETING,
  knowledgeReplies,
} from "@/lib/chatbotKnowledge";
import { matchUserMessage } from "@/lib/chatbotMatcher";
import { leadPrompts, leadSummary, type LeadStep } from "@/lib/chatbotFlows";

const QUICK = [
  "Book Amber Jane",
  "Event Types",
  "Music Style",
  "Pricing",
  "Availability",
  "Contact",
] as const;

type Msg = { id: string; role: "bot" | "user"; text: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChatWindow({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: uid(), role: "bot", text: CHAT_GREETING },
  ]);
  const [leadStep, setLeadStep] = useState<LeadStep>(null);
  const leadRef = useRef({
    eventType: "",
    date: "",
    location: "",
    guests: "",
    vibe: "",
    contact: "",
  });
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function pushUser(text: string) {
    setMessages((m) => [...m, { id: uid(), role: "user", text }]);
  }

  function pushBot(text: string) {
    setMessages((m) => [...m, { id: uid(), role: "bot", text }]);
  }

  function handleQuickReply(label: string) {
    pushUser(label);
    if (label === "Book Amber Jane") {
      setLeadStep("type");
      setTimeout(() => pushBot(leadPrompts.type), 200);
      return;
    }
    const canned = knowledgeReplies[label as keyof typeof knowledgeReplies];
    if (canned) setTimeout(() => pushBot(canned), 220);
  }

  function advanceLead(trimmed: string) {
    const step = leadStep;
    if (!step || step === "contact") return;

    if (step === "type") {
      leadRef.current.eventType = trimmed;
      setLeadStep("date");
      pushBot(`Got it — ${trimmed}. ${leadPrompts.date}`);
      return;
    }
    if (step === "date") {
      leadRef.current.date = trimmed;
      setLeadStep("location");
      pushBot(leadPrompts.location);
      return;
    }
    if (step === "location") {
      leadRef.current.location = trimmed;
      setLeadStep("guests");
      pushBot(leadPrompts.guests);
      return;
    }
    if (step === "guests") {
      leadRef.current.guests = trimmed;
      setLeadStep("vibe");
      pushBot(leadPrompts.vibe);
      return;
    }
    if (step === "vibe") {
      leadRef.current.vibe = trimmed;
      setLeadStep("contact");
      pushBot(leadPrompts.contact);
      return;
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    pushUser(text);

    if (leadStep && leadStep !== "contact") {
      setTimeout(() => advanceLead(text), 120);
      return;
    }

    if (leadStep === "contact") {
      leadRef.current.contact = text;
      const summary = leadSummary({ ...leadRef.current });
      leadRef.current = {
        eventType: "",
        date: "",
        location: "",
        guests: "",
        vibe: "",
        contact: "",
      };
      setLeadStep(null);
      setTimeout(() => pushBot(summary), 150);
      return;
    }

    const matched = matchUserMessage(text);
    setTimeout(() => {
      pushBot(
        matched ??
          `I can help with event types, music direction, availability, and how booking works. Try a quick reply, or tap “Book Amber Jane” to share your event details.`,
      );
    }, 200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-5 z-50 flex h-[min(560px,70vh)] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-ink/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:bottom-28 sm:right-8"
      role="dialog"
      aria-label="Amber Assistant chat"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-night/90 px-4 py-3">
        <div>
          <p className="font-display text-sm text-foreground">Amber Assistant</p>
          <p className="text-xs text-muted">Booking & music help</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
          aria-label="Close chat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} text={m.text} />
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/10 bg-night/80 px-3 py-3">
        <QuickReplies labels={QUICK} onSelect={handleQuickReply} />
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your event…"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-night px-3 py-2 text-sm text-foreground outline-none focus:border-neon-purple/50"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Send
          </button>
        </form>
        <p className="mt-2 text-center text-[10px] text-zinc-500">
          Full inquiry:{" "}
          <Link href="/contact" className="text-neon-blue hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
