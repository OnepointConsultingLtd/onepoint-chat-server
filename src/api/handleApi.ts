import { getCollection } from "./mongoClient";
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
        referenceSources: msg.referenceSources,
      };
    });
  return history;
}

export async function saveChatHistory(
  chatHistory: any[],
  conversationId: string,
  referenceSources?: any[],
) {

  const oldConversationId = chatHistory[chatHistory.length - 1]?.conversationId;
  const newConversationId = conversationId;

  try {
    const collection = await getCollection();

    // Filter out system messages before saving
    const filteredChatHistory = chatHistory.filter((msg) => msg.role !== 'system');

    const chatHistoryWithIds = filteredChatHistory.map((msg) => {
      const messageData: any = {
        ...msg,
        conversationId: newConversationId,
        messageId: msg.id,
      };

      // Preserve existing reference sources for each message
      if (msg.referenceSources && msg.referenceSources.length > 0) {
        messageData.referenceSources = msg.referenceSources;
      }

      return messageData;
    });

    // Add reference sources to the last assistant message if they exist
    if (referenceSources && referenceSources.length > 0) {
      const lastMessageIndex = chatHistoryWithIds.length - 1;
      if (lastMessageIndex >= 0 && chatHistoryWithIds[lastMessageIndex].role === 'assistant') {
        chatHistoryWithIds[lastMessageIndex].referenceSources = referenceSources;
      }
    }

    // Check if conversation already exists
    const existingConversation = await collection.findOne({ conversationId: newConversationId });

    if (existingConversation) {
      // Update existing conversation - preserve existing reference sources
      const existingChatHistory = existingConversation.chatHistory || [];

      // Merge existing chat history with new messages, preserving reference sources
      const mergedChatHistory = [...existingChatHistory];

      // Update or add new messages
      chatHistoryWithIds.forEach((newMsg: any) => {
        const existingIndex = mergedChatHistory.findIndex((existingMsg: any) =>
          existingMsg.id === newMsg.id || existingMsg.messageId === newMsg.messageId
        );

        if (existingIndex >= 0) {
          // Update existing message, preserve its reference sources
          mergedChatHistory[existingIndex] = {
            ...mergedChatHistory[existingIndex],
            ...newMsg,
            referenceSources: newMsg.referenceSources || mergedChatHistory[existingIndex].referenceSources
          };
        } else {
          mergedChatHistory.push(newMsg);
        }
      });

      await collection.updateOne(
        { conversationId: newConversationId },
        {
          $set: {
            conversationId: newConversationId,
            chatHistory: mergedChatHistory,
            userMessage: extractUserMessageContent(
              chatHistory[chatHistory.length - 1].content,
            ),
            timestamp: new Date().toISOString(),
          },
        }
      );
    } else {
      // Create new conversation
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
        { upsert: true }
      );
    }

    console.log("New conversation saved/updated in MongoDB.");

    // Delete the old conversation if it exists and is different
    if (oldConversationId && oldConversationId !== newConversationId) {
      const deleteResult = await collection.deleteOne({ conversationId: oldConversationId });
      console.log(`Old conversation deleted: ${deleteResult.deletedCount} record(s) removed`);
    }

  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}
