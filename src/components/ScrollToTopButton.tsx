"use client";

import { useCallback } from "react";

/** Fixed above the chat FAB — scrolls back to the top of the page. */
export function ScrollToTopButton() {
  const scrollToTop = useCallback(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-[5.5rem] right-5 z-[45] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-night/90 text-neon-blue shadow-lg shadow-black/40 backdrop-blur-md transition hover:scale-[1.03] hover:border-neon-blue/40 hover:bg-midnight/90 hover:text-neon-pink sm:bottom-[6.25rem] sm:right-8"
      aria-label="Scroll to top of page"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 15l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
