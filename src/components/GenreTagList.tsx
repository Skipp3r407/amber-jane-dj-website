import { cn } from "@/lib/utils";

type GenreTagListProps = {
  genres: readonly string[];
  className?: string;
};

export function GenreTagList({ genres, className }: GenreTagListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {genres.map((g) => (
        <li
          key={g}
          className="rounded-full border border-white/10 bg-midnight/40 px-3 py-1 text-xs font-medium text-zinc-300 ring-1 ring-white/5"
        >
          {g}
        </li>
      ))}
    </ul>
  );
}
