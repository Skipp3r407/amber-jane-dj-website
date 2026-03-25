import type { ReactNode } from "react";

type IconName = "rings" | "spark" | "vinyl" | "stage";

const icons: Record<IconName, ReactNode> = {
  rings: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 6a3 3 0 1 0 3 3" />
      <path d="M9 18a6 6 0 0 1 6-6" />
      <path d="M15 18a6 6 0 0 0-6-6" />
    </g>
  ),
  spark: (
    <path
      fill="currentColor"
      d="M12 2l1.5 5L19 12l-5.5 1.5L12 19l-1.5-5.5L5 12l5.5-5L12 2z"
      opacity="0.95"
    />
  ),
  vinyl: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </>
  ),
  stage: (
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
      d="M4 18h16M6 18V10l6-4 6 4v8M9 14h6"
    />
  ),
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="28"
      height="28"
      aria-hidden
    >
      {icons[name]}
    </svg>
  );
}
