import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Bookings" },
  { href: "/mixes", label: "Mixes" },
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/media-kit", label: "Press" },
  { href: "/gallery", label: "Gallery" },
];

const social = [
  { label: "Instagram", href: site.social.instagram },
  { label: "SoundCloud", href: site.social.soundcloud },
  { label: "Spotify", href: site.social.spotify },
  { label: "Mixcloud", href: site.social.mixcloud },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-midnight/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block outline-none ring-offset-2 ring-offset-midnight/40 focus-visible:ring-2 focus-visible:ring-neon-blue/60">
            <Image
              src="/images/amber-jane-logo.png"
              alt={site.name}
              width={220}
              height={88}
              className="h-10 w-auto max-w-[220px] object-contain object-left sm:h-11"
            />
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Premium DJ and music entertainment for private events, nightlife, weddings, and
            corporate experiences — built for the dance floor, polished for the room.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-5 py-2.5 text-sm font-semibold text-white shadow-neon transition hover:scale-[1.02] hover:brightness-110"
          >
            Book Amber Jane
          </Link>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link className="text-zinc-300 hover:text-white" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Booking</p>
          <p className="mt-4 text-sm text-zinc-300">
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            <a className="hover:text-white" href={`tel:${site.phone.replace(/\D/g, "")}`}>
              {site.phone}
            </a>
          </p>
          <p className="mt-4 text-xs text-muted">
            Serving {site.city}, {site.region}, and travel dates.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Social
          </p>
          <ul className="mt-2 flex flex-wrap gap-3 text-sm">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:text-violet-soft"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-zinc-500 sm:flex-row sm:text-left sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            <a href={site.credit.href} className="hover:text-zinc-400">
              {site.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
