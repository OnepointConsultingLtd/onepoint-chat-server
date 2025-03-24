import { getCollection } from "./mongoClient";

export async function getChatHistory(id: string) {
  try {
    const collection = await getCollection();
    const conversation = await collection.findOne({ id });

    return conversation ? conversation.chatHistory : [];
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return [];
  }
}

function extractUserMessage(chatHistory: any[]) {
  const lastMessage = chatHistory[chatHistory.length - 1]
  const lines = lastMessage.content.split('\n')
  let isCapturing = false
  let userMessage = ""
  for (const line of lines) {
    if (!isCapturing && line.includes("    User Message:")) {
      isCapturing = true
    } else if (isCapturing && line.includes("    Remember to:")) {
      isCapturing = false
      break
    } else if (isCapturing) {
      userMessage += line + "\n"
    }
  }
  return userMessage.trim()
}

export async function saveChatHistory(chatHistory: any[], id: string) {
  try {
    const collection = await getCollection();

    await collection.updateOne(
      { id },
      {
        $set:
        {
          userMessage: extractUserMessage(chatHistory),
          chatHistory,
          timestamp: new Date().toISOString()
        }
      },
      { upsert: true }
    );

    console.info("Getting  id->", id);
    console.log("Conversation saved/updated in MongoDB.");
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}
