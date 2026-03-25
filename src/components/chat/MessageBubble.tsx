type MessageBubbleProps = {
  role: "bot" | "user";
  text: string;
};

export function MessageBubble({ role, text }: MessageBubbleProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          role === "user"
            ? "bg-gradient-to-r from-neon-pink/90 to-neon-purple/90 text-white"
            : "border border-white/10 bg-white/5 text-zinc-200"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
