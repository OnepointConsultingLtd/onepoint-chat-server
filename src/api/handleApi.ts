import { getCollection } from "./mongoClient";

function extractUserMessageContent(content: string): string {
  const lines = content.split('\n');
  let isCapturing = false;
  let userMessage = "";

  for (const line of lines) {
    if (!isCapturing && line.includes("    User Message:")) {
      isCapturing = true;
    } else if (isCapturing && line.includes("    Remember to:")) {
      isCapturing = false;
      break;
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

    // If conversation not found, find the last valid conversation
    const lastConversation = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (lastConversation.length > 0) {
      return formatConversationHistory(lastConversation[0]);
    }
    console.log("No conversations found in database");
    return [];
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return [];
  }
}

function formatConversationHistory(conversation: any) {
  return conversation.chatHistory
    .filter((msg: any) => msg.role === "assistant" || msg.role === "user")
    .map((msg: any) => {
      if (msg.role === "user") {
        return {
          ...msg,
          content: extractUserMessageContent(msg.content),
          conversationId: conversation.conversationId
        };
      }
      return {
        ...msg,
        conversationId: conversation.conversationId
      };
    });
}

export async function saveChatHistory(chatHistory: any[], conversationId: string) {
  try {
    const collection = await getCollection();

    await collection.updateOne(
      { conversationId },
      {
        $set: {
          conversationId,
          chatHistory,
          userMessage: extractUserMessageContent(chatHistory[chatHistory.length - 1].content),
          timestamp: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    console.log("Conversation saved/updated in MongoDB.");
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}