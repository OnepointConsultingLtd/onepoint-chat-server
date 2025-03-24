import { Client } from "@gilf/chat-websocket-server";
import { saveChatHistory } from "../api/handleApi";

export async function saveConversation(client: Client): Promise<void> {
  const { id, chatHistory } = client;
  await saveChatHistory(chatHistory, id);
}
