import Link from "next/link";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  eyebrow = "Make it unforgettable",
  title,
  subtitle,
  primaryLabel = "Check Availability",
  primaryHref = "/contact",
  secondaryLabel = "Book Amber Jane",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-midnight/80 via-night to-neon-blue/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,60,172,0.18),_transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">{subtitle}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-3 text-sm font-semibold text-white shadow-neon transition hover:scale-[1.02] hover:brightness-110"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:scale-[1.02] hover:border-neon-blue/50 hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
