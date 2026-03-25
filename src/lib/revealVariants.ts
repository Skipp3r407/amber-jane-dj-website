export type RevealVariant = "up" | "down" | "left" | "right";

/** Cycles through all four directions for staggered grids and lists. */
export function revealVariantFromIndex(i: number): RevealVariant {
  const order: RevealVariant[] = ["left", "right", "up", "down"];
  return order[i % 4]!;
}
