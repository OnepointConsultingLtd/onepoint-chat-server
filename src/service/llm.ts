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
  console.log("provider", provider);
  switch (provider) {

    case "claude":
      console.log("Streaming from Claude with model:", model);
      yield* streamClaude(messages, model);
      break;
    case "gemini":
      console.log("Streaming from Gemini with model:", model);
      yield* streamGemini(messages, model);
      break;
    default:
      throw new Error(`Unsupported LLM provider: ${provider}`);
  }
}
