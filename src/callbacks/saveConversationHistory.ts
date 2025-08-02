import { Conversation } from "@gilf/chat-websocket-server";
import { saveChatHistory } from "../api/handleApi";
import { clientConversationTracker } from "../index";

export async function saveConversation(
  conversation: Conversation,
): Promise<void> {
  const { id, chatHistory } = conversation;
  let conversationId = id;

  if (clientConversationTracker.size > 0) {
    const entries = Array.from(clientConversationTracker.entries());
    const mostRecentEntry = entries[entries.length - 1];
    const clientConversationId = mostRecentEntry[1];

    console.log("🎯 Using most recent client conversation ID:", clientConversationId);
    conversationId = clientConversationId;

    // Clean up the used entry
    clientConversationTracker.delete(mostRecentEntry[0]);
  } else {
    console.log("🔍 No tracked client ID found, trying to extract from message content...");

    if (chatHistory && chatHistory.length > 0) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      const messageContent = JSON.stringify(lastMessage);

      const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
      const matches = messageContent.match(uuidRegex);

      if (matches && matches.length > 0) {
        for (const match of matches) {
          if (match !== id) {
            console.log("🎯 Found client conversation ID in message:", match);
            conversationId = match;
            break;
          }
        }
      }
    }
  }

  if (!conversationId) {
    console.error("❌ No conversation ID found for conversation:", id);
    return;
  }

  await saveChatHistory(chatHistory, conversationId);
}
