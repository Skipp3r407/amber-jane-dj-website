/**
 * Matches `SiteMusicShell` main padding so full-bleed sections reach the viewport left edge
 * (under the fixed EQ strip) while inner content aligns with the padded column.
 */
export const SITE_MAIN_BLEED =
  "-ml-[4.25rem] w-[calc(100%+4.25rem)] sm:-ml-24 sm:w-[calc(100%+6rem)] md:-ml-28 md:w-[calc(100%+7rem)]";

export const SITE_MAIN_INNER =
  "mx-auto max-w-6xl pr-4 pl-[calc(4.25rem+1rem)] sm:pr-6 sm:pl-[calc(6rem+1.5rem)] md:pl-[calc(7rem+1.5rem)]";

/** Same surface as Availability strip. */
export const SITE_PURPLE_BAR = "border-y border-white/10 bg-midnight/45";
