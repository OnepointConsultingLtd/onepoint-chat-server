import { getCollection } from "./mongoClient";
import { v4 as uuidv4 } from "uuid";
// Re-export getCollection for use in other modules
export { getCollection };

const MESSAGE_START_STRING = "User Message to which you are responding:";

export function extractUserMessageContent(content: string): string {
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
        messageId: msg.id,
      };
    });
  return history;
}

export async function saveChatHistory(
  chatHistory: any[],
  conversationId: string,
) {
  const oldConversationId = chatHistory[chatHistory.length - 1]?.conversationId;
  const newConversationId = conversationId;

  try {
    const collection = await getCollection();

    // Filter out system messages before saving
    const filteredChatHistory = chatHistory.filter((msg) => msg.role !== 'system');

    const chatHistoryWithIds = filteredChatHistory.map((msg) => ({
      ...msg,
      conversationId: newConversationId,
      messageId: msg.id,
    }));

    await collection.updateOne(
      { conversationId: newConversationId },
      {
        $set: {
          conversationId: newConversationId,
          chatHistory: chatHistoryWithIds,
          userMessage: extractUserMessageContent(
            chatHistory[chatHistory.length - 1].content,
          ),
          timestamp: new Date().toISOString(),
        },
      },
      { upsert: true },
    );

    console.log("New conversation saved/updated in MongoDB.");

    // Delete the old conversation if it exists.
    if (oldConversationId && oldConversationId !== newConversationId) {
      const deleteResult = await collection.deleteOne({ conversationId: oldConversationId });
      console.log(`Old conversation deleted: ${deleteResult.deletedCount} record(s) removed`);
    }

  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}
