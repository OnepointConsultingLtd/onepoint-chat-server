import { Conversation } from "@gilf/chat-websocket-server";
import { saveChatHistory } from "../api/handleApi";

export async function saveConversation(conversation: Conversation): Promise<void> {
  const { id, chatHistory, clientId } = conversation;

  if (!clientId) {
    console.error("No client ID found for conversation:", id);
    return;
  }

  console.log("checking chatHistory ->", chatHistory);
  console.log("Saving conversation with client ID:", clientId);
  await saveChatHistory(chatHistory, id, clientId);
}
