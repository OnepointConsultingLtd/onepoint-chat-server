import { ChatMessage, LLMProviderName } from "../types";
import { streamOpenAI } from "./openai";
import { streamClaude } from "./claude";
import { streamGemini } from "./gemini";

export type StreamLLMOptions = {
  provider: LLMProviderName;
  model?: string;
  messages: ChatMessage[];
};

export async function* streamLLM({
  messages,
  provider,
  model,
}: StreamLLMOptions): AsyncGenerator<string> {
  switch (provider) {
    case "openai":
      yield* streamOpenAI(messages, model);
      break;
    case "claude":
      yield* streamClaude(messages, model);
      break;
    case "gemini":
      yield* streamGemini(messages, model);
      break;
    default:
      throw new Error(`Unsupported LLM provider: ${provider}`);
  }
}
