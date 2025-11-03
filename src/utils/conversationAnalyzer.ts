// utils/conversationAnalyzer.ts
import { ChatMessage } from "@gilf/chat-websocket-server";
import { ConversationAnalysis } from "../types/conversation";
import { personaMappings, serviceMappings } from "../data/mappings";

// Helper: build regex once per keyword (word boundary, case-insensitive)
function kwRegex(keyword: string): RegExp {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i");
}

export function analyzeConversation(chatHistory: ChatMessage[]): ConversationAnalysis {
  // Consider up to last 12 messages with recency weighting
  const window = chatHistory.slice(-12);

  // Precompute a single text with position markers for light recency weighting
  // Newer messages get +20%, older messages get baseline
  const texts = window.map((m, i, arr) => {
    const weight = 1 + (i / Math.max(arr.length - 1, 1)) * 0.2; // 1.0 .. 1.2
    return { text: m.content, weight };
  });

  // Persona scoring
  let bestPersona = "Unknown";
  let bestScore = 0;

  for (const mapping of personaMappings) {
    let score = 0;
    const regs = mapping.keywords.map(kwRegex);
    for (const { text, weight } of texts) {
      for (const rx of regs) {
        if (rx.test(text)) score += 1 * weight;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestPersona = mapping.persona;
    }
  }

  // Services (allow multiple)
  const services = serviceMappings
    .map((mapping) => {
      const regs = mapping.keywords.map(kwRegex);
      let score = 0;
      for (const { text, weight } of texts) {
        for (const rx of regs) {
          if (rx.test(text)) score += 1 * weight;
        }
      }
      return { name: mapping.service, score };
    })
    .filter(s => s.score > 0.5) // small threshold to reduce noise
    .sort((a, b) => b.score - a.score)
    .map(s => s.name);

  const isInitialQuestionsComplete = chatHistory.length >= 4;

  return {
    persona: bestPersona,
    services,
    isInitialQuestionsComplete,
  };
}
