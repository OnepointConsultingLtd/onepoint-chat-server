import { ChatMessage, Role, type LLMProviderName, type PromptConfig } from "../types";
import { getMaxHistorySize } from "../utils/prompts";
import type { ReferenceSource } from "../types";
import { getContext } from "../api";
import { analyzeConversation } from "../utils/conversationAnalyzer";
import { isWelcomeMessage } from "../utils/isWelcomeMessage";
import {
  buildStaticBlock,
  buildPersonaBlock,
  buildDynamicBlock,
  buildSystemContent,
} from "./systemPromptBuilder";
import extractReferenceSources from "../utils/extractReferenceSources";

function truncateText(text: string, maxTokens = 2000): string {
  if (!text || typeof text !== "string") return "";
  const words = text.split(" ");
  return (
    words.slice(0, maxTokens).join(" ") +
    (words.length > maxTokens ? "..." : "")
  );
}

function contextAdapter(response: { success?: boolean; data?: unknown }): string {
  if (response.success && response.data && typeof response.data === "object" && "context_text" in response.data) {
    const text = (response.data as { context_text?: string }).context_text;
    return typeof text === "string" ? text : "";
  }
  return typeof response.data === "string" ? response.data : "";
}

export async function onepointCallback(
  chatHistory: ChatMessage[],
  promptConfig: PromptConfig,
  llmProvider: LLMProviderName,
  /** Registry `projectName` → LightRAG `project=` query param on CONTEXT_API_URL */
  contextProjectName: string,
): Promise<{ chatHistory: ChatMessage[]; referenceSources: ReferenceSource[] }> {

  const analysis = analyzeConversation(chatHistory);
  const lastMessage = chatHistory.slice(-1)[0];
  const contextResponse = await getContext(lastMessage.content, {
    projectName: contextProjectName,
  });
  const knowledgeBase = truncateText(contextAdapter(contextResponse), 1000);
  const referenceSources = extractReferenceSources(contextResponse.data);

  const staticPart = buildStaticBlock(promptConfig);
  const personaPart = buildPersonaBlock(analysis);
  const dynamicPart = buildDynamicBlock(knowledgeBase, analysis, referenceSources);

  const systemInstructions: ChatMessage = {
    id: `system-instructions-${Date.now()}`,
    role: Role.SYSTEM,
    content: buildSystemContent(staticPart, personaPart, dynamicPart, llmProvider),
  };

  const MAX_HISTORY = getMaxHistorySize(promptConfig);
  const slicedHistory = chatHistory
    .slice(-MAX_HISTORY - 1, -1)
    .filter((m) => {
      if (m.role === Role.SYSTEM) return false;
      if (m.role === "assistant" && isWelcomeMessage(m.content)) return false;
      return true;
    });

  const messagesForLLM: ChatMessage[] = [
    ...slicedHistory,
    systemInstructions,
    lastMessage,
  ];

  return {
    chatHistory: messagesForLLM,
    referenceSources,
  };
}
