import { ChatMessage } from "@gilf/chat-websocket-server";
import { ConversationAnalysis } from "../types/conversation";
import { personaMappings, serviceMappings } from "../data/mappings";

/**
 * Analyzes conversation history to identify user persona and relevant services
 */

export function analyzeConversation(
  chatHistory: ChatMessage[],
): ConversationAnalysis {
  const lastTwoMessages = chatHistory.slice(-2);
  const combinedText = lastTwoMessages
    .map((msg) => msg.content.toLowerCase())
    .join(" ");


  // Identify persona
  let persona = "Unknown";
  for (const mapping of personaMappings) {
    if (mapping.keywords.some((keyword) => combinedText.includes(keyword))) {
      persona = mapping.persona;
      break;
    }
  }

  // Identify relevant services
  const services = serviceMappings
    .filter((mapping) =>
      mapping.keywords.some((keyword) => combinedText.includes(keyword)),
    )
    .map((mapping) => mapping.service);

  const isInitialQuestionsComplete = chatHistory.length >= 4;

  return {
    persona,
    services,
    isInitialQuestionsComplete,
  };
}
