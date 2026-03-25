"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatWindow } from "@/components/chat/ChatWindow";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple text-white shadow-neon transition hover:scale-[1.03] hover:brightness-110 sm:bottom-8 sm:right-8 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-label="Open Amber Assistant chat"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? <ChatWindow onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
