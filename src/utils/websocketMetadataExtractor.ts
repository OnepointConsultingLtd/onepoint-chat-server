// Extract and store metadata from WebSocket messages
import { setConversationMetadata } from "../callbacks/saveConversationHistory";

// This will be called by the WebSocket server when messages are received
// We need to intercept messages before they're processed by the library

export function extractMetadataFromMessage(message: any, conversationId: string) {
  if (!message || !conversationId) return;

  // Extract metadata from WebSocket message
  const metadata = message.metadata || {};
  const userId = metadata.userId || null;
  const anonymousId = metadata.anonymousId || null;

  if (userId || anonymousId) {
    console.log(`[metadataExtractor] Extracting metadata from message - conversationId: ${conversationId}, userId: ${userId}, anonymousId: ${anonymousId}`);
    setConversationMetadata(conversationId, { userId, anonymousId });
  }
}
