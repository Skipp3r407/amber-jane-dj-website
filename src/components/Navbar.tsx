"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Bookings" },
  { href: "/mixes", label: "Mixes" },
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/5 transition-all duration-300",
        scrolled
          ? "bg-night/90 shadow-lg shadow-black/25 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link
          href="/"
          className="group relative flex shrink-0 items-center outline-none ring-offset-2 ring-offset-night focus-visible:ring-2 focus-visible:ring-neon-blue/60 [-webkit-tap-highlight-color:transparent]"
        >
          <Image
            src="/images/amber-jane-logo.png"
            alt="Amber Jane"
            width={900}
            height={360}
            priority
            className="h-auto w-auto max-h-24 object-contain object-left transition duration-300 [mix-blend-mode:screen] group-hover:brightness-110 sm:max-h-36 md:max-h-44 lg:max-h-[11.25rem]"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-xs font-medium text-zinc-300 transition hover:text-white lg:px-3 lg:text-sm",
                  active && "text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-xs font-semibold text-white shadow-neon transition hover:scale-[1.02] hover:brightness-110 sm:inline-flex lg:text-sm"
          >
            Book Amber Jane
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-zinc-200 xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 bg-night/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex max-h-[75vh] flex-col gap-1 overflow-auto px-4 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium",
                    pathname === l.href
                      ? "bg-white/10 text-white"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-3 text-center text-sm font-semibold text-white shadow-neon"
              >
                Book Amber Jane
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
