import { matcherTopics } from "@/lib/chatbotKnowledge";

export function matchUserMessage(text: string): string | null {
  const t = text.trim();
  if (!t) return null;
  for (const m of matcherTopics) {
    if (m.test.test(t)) return m.reply;
  }
  return null;
}
