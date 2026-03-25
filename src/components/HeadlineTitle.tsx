import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeadlineSize = "hero" | "page" | "section" | "subsection";

type HeadlineTitleProps = {
  as?: "h1" | "h2" | "h3";
  size?: HeadlineSize;
  /** Primary line — solid white (matches hero first line). */
  title?: string;
  /** Second line — animated pink → purple → cyan gradient (matches hero). */
  titleGradient?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  children?: ReactNode;
};

const sizeClasses: Record<HeadlineSize, string> = {
  hero: "text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
  page: "text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
  section: "text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl",
  subsection: "text-2xl font-bold leading-tight tracking-tight sm:text-3xl",
};

/**
 * Shared hero-style headline: optional white first line + gradient second line,
 * or a single gradient line when only `titleGradient` is set.
 */
export function HeadlineTitle({
  as: Tag = "h2",
  size = "section",
  title,
  titleGradient,
  align = "left",
  className,
  id,
  children,
}: HeadlineTitleProps) {
  const hasPrimary = Boolean(title?.trim());
  const hasGradient = Boolean(titleGradient?.trim());

  return (
    <Tag
      id={id}
      className={cn(
        "font-display",
        sizeClasses[size],
        align === "center" && "text-center",
        className,
      )}
    >
      {children
        ? children
        : hasGradient && hasPrimary ? (
            <>
              <span className="text-white [text-shadow:0_0_42px_rgba(0,194,255,0.14)]">{title}</span>
              <span className="mt-1 block text-gradient-live">{titleGradient}</span>
            </>
          ) : hasGradient && !hasPrimary ? (
            <span className="block text-gradient-live [filter:drop-shadow(0_0_24px_rgba(0,194,255,0.12))]">
              {titleGradient}
            </span>
          ) : (
            <span className="text-white [text-shadow:0_0_42px_rgba(0,194,255,0.14)]">{title}</span>
          )}
    </Tag>
  );
}
