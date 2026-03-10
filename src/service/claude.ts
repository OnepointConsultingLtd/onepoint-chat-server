// src/service/claude.ts
import Anthropic from "@anthropic-ai/sdk";
import { ChatMessage, Role, SystemBlock } from "../types";
import { logCacheBlocks } from "../logs/logCacheBlocks";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Build system blocks with surgical cache placement ─────
//
// We receive the system prompt pre-split into parts:
//   staticPart  → Osca identity + British English rules (never changes)
//   personaPart → persona + services block (changes rarely)
//   dynamicPart → RAG context + persona question (changes every message)
//
// Cache breakpoints are placed after static and persona parts.
// Dynamic RAG context is NEVER cached — it changes every call.

export function buildSystemBlocks(parts: {
  staticPart: string;      // from prompts.toml — never changes
  personaPart: string;     // persona + services — changes rarely  
  dynamicPart: string;     // RAG context — changes every message
}): SystemBlock[] {
  return [
    // Block 1 — fully static, always cache
    {
      type: "text",
      text: parts.staticPart,
      cache_control: { type: "ephemeral" },
    },
    // Block 2 — persona/services, cache (reused across turns with same persona)
    {
      type: "text",
      text: parts.personaPart,
      cache_control: { type: "ephemeral" },
    },
    // Block 3 — RAG knowledge base, NEVER cache (unique per message)
    {
      type: "text",
      text: parts.dynamicPart,
      // no cache_control here intentionally
    },
  ];
}

// ── Format conversation history with caching ─────────────
//
// All prior turns are cached — Claude reuses them instead of
// reprocessing the entire conversation history each time.
// Only the latest user message is left uncached (it's always new).

function toClaudeMessages(messages: ChatMessage[]): Anthropic.MessageParam[] {
  const nonSystem = messages.filter((m) => m.role !== Role.SYSTEM);

  return nonSystem.map((m, index) => {
    const isLastMessage = index === nonSystem.length - 1;
    const isLastAssistantMessage =
      m.role === "assistant" &&
      // find the last assistant message index
      index === [...nonSystem].map(x => x.role).lastIndexOf("assistant");

    // Latest user message — never cache
    if (isLastMessage) {
      return {
        role: m.role as "user" | "assistant",
        content: m.content,
      };
    }

    // Last assistant turn — cache it (block 3, our 3rd and final cache block)
    if (isLastAssistantMessage) {
      return {
        role: "assistant" as const,
        content: [
          {
            type: "text" as const,
            text: m.content,
            cache_control: { type: "ephemeral" as const },
          },
        ],
      };
    }

    // All other turns — no cache
    return {
      role: m.role as "user" | "assistant",
      content: m.content,
    };
  });
}


export async function* streamClaude(
  messages: ChatMessage[],
  model?: string,
): AsyncGenerator<string> {

  const systemMessage = messages.find((m) => m.role === Role.SYSTEM);

  let systemBlocks: SystemBlock[];

  if (systemMessage?.content.includes("__CACHE_SPLIT__")) {
    const [staticPart, personaPart, dynamicPart] =
      systemMessage.content.split("__CACHE_SPLIT__");
    systemBlocks = buildSystemBlocks({ staticPart, personaPart, dynamicPart });
  } else {
    systemBlocks = [
      {
        type: "text",
        text: systemMessage?.content ?? "",
        cache_control: { type: "ephemeral" },
      },
    ];
  }

  const claudeMessages = toClaudeMessages(messages);
  logCacheBlocks(systemBlocks, claudeMessages);

  const stream = client.messages.stream({
    model: model || process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemBlocks,
    messages: claudeMessages,
  });

  

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }


  const response = await stream.finalMessage();

  console.log("Claude usage:", {
    input_tokens: response.usage.input_tokens,
    output_tokens: response.usage.output_tokens,
    cache_creation_tokens: response.usage.cache_creation_input_tokens,
    cache_read_tokens: response.usage.cache_read_input_tokens,
  });
}

