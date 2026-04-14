import { WebSocket } from "ws";
import { Role, LLMProviderName } from "./enums";
import type { ClientDocument } from "./clientDocument";

export { Role, LLMProviderName } from "./enums";
export { MessageType, MessageSubtype } from "./enums";

export interface ReferenceSource {
  id?: string;
  title?: string;
  url?: string;
  snippet?: string;
  filePath?: string;
  [key: string]: unknown;
}

export interface ChatMessage {
  id: string;
  role: Role | string;
  content: string;
  /** True for the tenant welcome bubble from `initial_questions` (not LLM stream). */
  isWelcome?: boolean;
  timestamp?: Date;
  referenceSources?: ReferenceSource[];
  conversationId?: string;
  messageId?: string;
}

export interface StoredChatMessage extends ChatMessage {
  messageId?: string;
}

export interface MongoConversation {
  conversationId: string;
  userId?: string | null;
  anonymousId?: string | null;
  chatHistory: StoredChatMessage[];
  userMessage?: string | null;
  timestamp?: string;
  lastUpdated?: string;
  createdAt?: string;
  isActive?: boolean;
}

export interface Conversation {
  id: string;
  ws: WebSocket;
  chatHistory: ChatMessage[];
  metadata: UserMetadata;
  /** Resolved osca-registry client for this WebSocket connection */
  tenant: ClientDocument;
  promptConfig: PromptConfig;
}

export interface UserMetadata {
  userId?: string | null;
  anonymousId?: string | null;
}

export interface SystemBlock {
  type: "text";
  text: string;
  cache_control?: { type: "ephemeral" };
}

/**
 * Parsed from each tenant’s registry `prompt` TOML (`[persona]`, `[welcome]`, etc.).
 * The WebSocket server builds the welcome bubble from `basic.initial_questions` and the LLM system
 * block from `basic.system_message`. To drive more UI copy per tenant later, add optional fields
 * under `basic` (e.g. product label) and expose them via a small config API or the first WS payload.
 */
export interface PromptConfig {
  basic: {
    system_message: string;
    initial_questions: string[];
  };
  configuration: {
    max_history_size: number;
  };
}
