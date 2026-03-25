import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue">{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
          align === "center" && "mx-auto max-w-3xl",
        )}
      >
        {title}
      </h2>
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
