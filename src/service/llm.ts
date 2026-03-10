import { ChatMessage, LLMProviderName } from "../types";
import { streamOpenAI } from "./openai";
import { streamClaude } from "./claude";
import { streamGemini } from "./gemini";

const providerName =
  (process.env.LLM_PROVIDER as LLMProviderName) || "openai";

export function getProviderName(): LLMProviderName {
  console.log("This is the provider name: ", providerName);
  return providerName;
}

export async function* streamLLM(
  messages: ChatMessage[],
  provider?: LLMProviderName,
  model?: string,
): AsyncGenerator<string> {
  const active = provider || providerName;

  console.log("This is the active provider: ", active);

  switch (active) {
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
      throw new Error(`Unsupported LLM provider: ${active}`);
  }
}
