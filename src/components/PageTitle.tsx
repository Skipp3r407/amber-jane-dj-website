import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeadlineTitle } from "@/components/HeadlineTitle";

type PageTitleProps = {
  eyebrow: string;
  title?: string;
  titleGradient?: string;
  subtitle?: ReactNode;
  className?: string;
};

/** Page-level H1 with the same eyebrow + two-line gradient treatment as the home hero. */
export function PageTitle({ eyebrow, title, titleGradient, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn(className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">{eyebrow}</p>
      <HeadlineTitle as="h1" size="page" title={title} titleGradient={titleGradient} className="mt-4" />
      {subtitle ? (
        <div className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</div>
      ) : null}
    </div>
  );
}
