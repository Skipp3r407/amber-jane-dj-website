import Link from "next/link";

export function ReviewHighlightBanner() {
  const items = [
    "Crowd locked in all night",
    "Smooth transitions",
    "Pro on and off stage",
    "Would book again",
  ];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-night">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(123,44,255,0.4), transparent)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-center text-sm font-medium text-zinc-400 sm:text-left">
          Trusted by hosts, venues, and planners who want energy{" "}
          <span className="text-foreground">without</span> the chaos.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
          {items.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
        <Link
          href="/testimonials"
          className="text-sm font-semibold text-neon-blue hover:underline"
        >
          Read reviews
        </Link>
      </div>
    </div>
  );
}
