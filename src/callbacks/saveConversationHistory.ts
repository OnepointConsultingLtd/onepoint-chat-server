import { Conversation } from "@gilf/chat-websocket-server";
import { saveChatHistory } from "../api/handleApi";

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

  await saveChatHistory(chatHistory, conversationId, referenceSources);
}
