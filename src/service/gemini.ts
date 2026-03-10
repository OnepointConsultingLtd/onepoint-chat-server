import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

function toGeminiMessages(messages: ChatMessage[]) {
  const systemMsg = messages.find((m) => m.role === "system");
  const nonSystem = messages.filter((m) => m.role !== "system");

  return {
    systemInstruction: systemMsg?.content,
    history: nonSystem.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    })),
    lastMessage: nonSystem[nonSystem.length - 1]?.content || "",
  };
}

export async function* streamGemini(
  messages: ChatMessage[],
  model?: string,
): AsyncGenerator<string> {
  const { systemInstruction, history, lastMessage } =
    toGeminiMessages(messages);

  const response = await client.models.generateContentStream({
    model: model || process.env.GEMINI_MODEL || "gemini-2.0-flash",
    contents: [
      ...history.map((h) => ({
        role: h.role,
        parts: h.parts,
      })),
      { role: "user" as const, parts: [{ text: lastMessage }] },
    ],
    config: {
      systemInstruction: systemInstruction || undefined,
    },
  });

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) yield text;
  }
}
