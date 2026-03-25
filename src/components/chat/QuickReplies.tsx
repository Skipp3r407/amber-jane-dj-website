type QuickRepliesProps = {
  labels: readonly string[];
  onSelect: (label: string) => void;
};

export function QuickReplies({ labels, onSelect }: QuickRepliesProps) {
  return (
    <div className="mb-2 flex flex-wrap gap-1.5">
      {labels.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => onSelect(q)}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition hover:border-neon-blue/40 hover:text-white"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
