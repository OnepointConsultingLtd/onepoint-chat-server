import { getCollection } from "./mongoClient";

const MESSAGE_START_STRING = "    User Message:"
const MESSAGE_END_STRING = "    Remember to:"

function extractUserMessageContent(content: string): string {
  if (!content.includes(MESSAGE_START_STRING)) {
    return content
  }
  const lines = content.split('\n');
  let isCapturing = false;
  let userMessage = "";

  for (const line of lines) {
    if (!isCapturing && line.includes(MESSAGE_START_STRING)) {
      isCapturing = true;
    } else if (isCapturing && line.includes(MESSAGE_END_STRING)) {
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
  const history = conversation.chatHistory
    .filter((msg: any) => ["assistant", "user"].includes(msg.role))
    .map((msg: any) => {
      return {
        ...msg,
        content: extractUserMessageContent(msg.content),
        conversationId: conversation.conversationId
      };
    });
  return history
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