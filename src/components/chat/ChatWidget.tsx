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
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3C7 3 3 7 3 12c0 1.5.4 2.9 1 4.1L3 21l1.9-1.5c1.2.6 2.6 1 4.1 1 5 0 9-4 9-9s-4-9-9-9z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? <ChatWindow onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
