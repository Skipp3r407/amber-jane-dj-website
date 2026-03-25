import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeadlineTitle } from "@/components/HeadlineTitle";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  /** Second line — same animated gradient as the home hero. */
  titleGradient?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Sets `id` on the heading for `aria-labelledby`. */
  headingId?: string;
  /** Override default cyan eyebrow (e.g. `text-zinc-400` to match a white headline). */
  eyebrowClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  titleGradient,
  subtitle,
  align = "left",
  className,
  headingId,
  eyebrowClassName,
}: SectionHeadingProps) {
  const hasTitle = Boolean(title?.trim()) || Boolean(titleGradient?.trim());

  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.35em]",
            eyebrowClassName ?? "text-neon-blue",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {hasTitle ? (
        <HeadlineTitle
          id={headingId}
          as="h2"
          size="section"
          title={title}
          titleGradient={titleGradient}
          align={align}
          className={cn("mt-2", align === "center" && "mx-auto max-w-3xl")}
        />
      ) : null}
      {subtitle ? (
        <div
          className={cn(
            "mt-3 max-w-2xl text-base text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
