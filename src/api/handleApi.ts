import { getCollection } from "./mongoClient";

// Re-export getCollection for use in other modules
export { getCollection };

const MESSAGE_START_STRING = "User Message to which you are responding:";

function extractUserMessageContent(content: string): string {
  if (!content.includes(MESSAGE_START_STRING)) {
    return content;
  }
  const lines = content.split("\n");
  let isCapturing = false;
  let userMessage = "";

  for (const line of lines) {
    if (!isCapturing && line.includes(MESSAGE_START_STRING)) {
      isCapturing = true;
    } else if (isCapturing) {
      userMessage += line + "\n";
    }
  }
  return userMessage.trim();
}

export async function getChatHistory(conversationId: string) {
  try {
    const collection = await getCollection();

    const conversation = await collection.findOne({ conversationId });

    if (conversation) {
      return formatConversationHistory(conversation);
    }

    console.warn(`No conversations found in database for ${conversationId}`);
    return [];
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return [];
  }
}

export function formatConversationHistory(conversation: any) {
  const history = conversation.chatHistory
    .filter((msg: any) => ["assistant", "user"].includes(msg.role))
    .map((msg: any) => {
      return {
        ...msg,
        content: extractUserMessageContent(msg.content),
        conversationId: conversation.conversationId,
      };
    });
  return history;
}

export async function saveChatHistory(
  chatHistory: any[],
  conversationId: string,
) {
  try {
    const collection = await getCollection();

    // Check if conversation already exists
    const existingConversation = await collection.findOne({ conversationId });

    let finalChatHistory = chatHistory;

    if (existingConversation && existingConversation.chatHistory) {
      console.log("📚 Found existing conversation with", existingConversation.chatHistory.length, "messages");
      console.log("📝 Appending", chatHistory.length, "new messages");

      // Append new messages to existing history, avoiding duplicates
      const existingHistory = existingConversation.chatHistory;
      const newMessages = chatHistory.filter(newMsg =>
        !existingHistory.some((existingMsg: any) =>
          existingMsg.content === newMsg.content &&
          existingMsg.role === newMsg.role
        )
      );

      if (newMessages.length > 0) {
        finalChatHistory = [...existingHistory, ...newMessages];
        console.log("✅ Final history will have", finalChatHistory.length, "messages");
      } else {
        console.log("🔄 No new messages to add, keeping existing history");
        finalChatHistory = existingHistory;
      }
    } else {
      console.log("🆕 Creating new conversation with", chatHistory.length, "messages");
    }

    await collection.updateOne(
      { conversationId },
      {
        $set: {
          conversationId,
          chatHistory: finalChatHistory,
          userMessage: extractUserMessageContent(
            chatHistory[chatHistory.length - 1].content,
          ),
          timestamp: new Date().toISOString(),
        },
      },
      { upsert: true },
    );
    console.log("💾 Conversation saved/updated in MongoDB with", finalChatHistory.length, "total messages");
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}
