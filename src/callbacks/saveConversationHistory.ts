import { Conversation } from "@gilf/chat-websocket-server";
import { saveChatHistory } from "../api/handleApi";

export async function saveConversation(conversation: Conversation): Promise<void> {
  const { id, chatHistory } = conversation;

  const conversationId = id;

  // the id is actualy the convesationId
  if (!conversationId) {
    console.error("No conversation ID found for conversation:", id);
    return;
  }

  console.log("checking chatHistory ->", chatHistory);
  console.log("Saving conversation with conversation ID:", conversationId);
  await saveChatHistory(chatHistory, conversationId);
}
