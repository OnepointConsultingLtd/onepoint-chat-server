import { Conversation } from "@gilf/chat-websocket-server";
import { saveChatHistory } from "../api/handleApi";

// Global storage for user metadata per conversation
const conversationMetadata = new Map<string, { userId?: string | null; anonymousId?: string | null }>();

// Store metadata from WebSocket messages (keyed by conversationId from message)
const messageMetadata = new Map<string, { userId?: string | null; anonymousId?: string | null }>();

export function setConversationMetadata(conversationId: string, metadata: { userId?: string | null; anonymousId?: string | null }) {
  console.log(`[setConversationMetadata] Storing metadata for conversationId: ${conversationId}`, metadata);
  conversationMetadata.set(conversationId, metadata);
}

// Store metadata from incoming WebSocket messages
export function storeMessageMetadata(conversationId: string, metadata: { userId?: string | null; anonymousId?: string | null }) {
  console.log(`[storeMessageMetadata] Storing message metadata for conversationId: ${conversationId}`, metadata);
  messageMetadata.set(conversationId, metadata);
  // Also store in conversationMetadata for backward compatibility
  conversationMetadata.set(conversationId, metadata);
}

export async function saveConversation(
  conversation: Conversation,
  referenceSources?: any[],
): Promise<void> {
  const { id, chatHistory } = conversation;

  const conversationId = id;

  if (!conversationId) {
    console.error("No conversation ID found for conversation:", id);
    return;
  }

  // Try to get metadata from multiple sources:
  // 1. From conversationMetadata Map (stored via API)
  // 2. From messageMetadata Map (stored from WebSocket messages)
  let metadata = conversationMetadata.get(conversationId) || messageMetadata.get(conversationId) || {};
  
  const userId = metadata.userId !== undefined ? metadata.userId : null;
  const anonymousId = metadata.anonymousId !== undefined ? metadata.anonymousId : null;

  console.log(`[saveConversation] conversationId: ${conversationId}, userId: ${userId}, anonymousId: ${anonymousId}`);
  console.log(`[saveConversation] metadataMap size: ${conversationMetadata.size}, messageMetadata size: ${messageMetadata.size}`);
  console.log(`[saveConversation] Available conversationMetadata keys:`, Array.from(conversationMetadata.keys()));
  console.log(`[saveConversation] Available messageMetadata keys:`, Array.from(messageMetadata.keys()));
  console.log(`[saveConversation] Metadata for this conversation:`, metadata);

  // Clean up metadata after use
  conversationMetadata.delete(conversationId);
  messageMetadata.delete(conversationId);

  await saveChatHistory(chatHistory, conversationId, referenceSources, userId, anonymousId);
}
