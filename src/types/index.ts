import { WebSocket } from "ws";
import { Role, LLMProviderName } from "./enums";

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

export interface PromptConfig {
  basic: {
    system_message: string;
    initial_questions: string[];
  };
  configuration: {
    max_history_size: number;
  };
}
