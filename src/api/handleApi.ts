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

export async function getChatHistory(clientId: string) {
  try {
    const collection = await getCollection();

    const conversation = await collection
      .find({ clientId })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    console.log("conversation ->", conversation);

    if (conversation.length === 0) return [];

    // Filter out system messages and clean up user messages
    const filteredHistory = conversation[0].chatHistory
      .filter((msg: any) => msg.role === "assistant" || msg.role === "user")
      .map((msg: any) => {
        if (msg.role === "user") {
          return {
            ...msg,
            content: extractUserMessageContent(msg.content)
          };
        }
        return msg;
      });

    console.log("filteredHistory ->", filteredHistory);

    return filteredHistory;
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return [];
  }
}

export async function saveChatHistory(chatHistory: any[], id: string, clientId: string) {
  console.log("chatHistory ->", chatHistory);
  try {
    const collection = await getCollection();

    await collection.updateOne(
      { conversationId: id },
      {
        $set:
        {
          clientId,
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