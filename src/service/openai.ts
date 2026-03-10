import OpenAI from "openai";
import { ChatMessage } from "../types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function toOpenAIMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role as "system" | "user" | "assistant",
    content: m.content,
  }));
}

export async function* streamOpenAI(
  messages: ChatMessage[],
  model?: string,
): AsyncGenerator<string> {
  const stream = await client.chat.completions.create({
    model: model || process.env.OPENAI_MODEL || "gpt-4o",
    messages: toOpenAIMessages(messages),
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) yield content;
  }
}
