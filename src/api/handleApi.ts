import { getCollection } from "./mongoClient";
import type { ChatMessage, MongoConversation, ReferenceSource, StoredChatMessage } from "../types";

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

    const conversation = await collection.findOne({ conversationId }) as MongoConversation | null;

    if (conversation) {
      return formatConversationHistory(conversation);
    }

    console.warn(`No conversations found in database for ${conversationId}`);
    return [];
  } catch (error: any) {
    console.error("Error retrieving conversation:", error.message);
    return [];
  }
}

export async function getChatHistoryWithMetadata(conversationId: string) {
  try {
    const collection = await getCollection();

    const conversation = await collection.findOne({ conversationId }) as MongoConversation | null;

    if (conversation) {
      return {
        conversationId: conversation.conversationId,
        userId: conversation.userId || null,
        anonymousId: conversation.anonymousId || null,
        isActive: conversation.isActive || false,
        timestamp: conversation.timestamp || null,
        lastUpdated: conversation.lastUpdated || null,
        createdAt: conversation.createdAt || null,
        userMessage: conversation.userMessage || null,
        messageCount: conversation.chatHistory?.length || 0,
        chatHistory: formatConversationHistory(conversation),
      };
    }

    console.warn(`No conversations found in database for ${conversationId}`);
    return null;
  } catch (error: any) {
    console.error("Error retrieving conversation with metadata:", error.message);
    return null;
  }
}

export function formatConversationHistory(conversation: MongoConversation) {
  const history = conversation.chatHistory
    .filter((msg: StoredChatMessage) => ["assistant", "user"].includes(msg.role))
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
  chatHistory: ChatMessage[],
  conversationId: string,
  referenceSources?: ReferenceSource[],
  userId?: string | null,
  anonymousId?: string | null,
) {
  const oldConversationId = chatHistory[chatHistory.length - 1]?.conversationId;
  const newConversationId = conversationId;

  try {
    const collection = await getCollection();
    const filteredChatHistory = chatHistory.filter((msg) => msg.role !== "system");
    const lastMsg = filteredChatHistory.at(-1);
    if (!lastMsg?.content) return;

    const chatHistoryWithIds = filteredChatHistory.map((msg) => {
      const messageData: StoredChatMessage = {
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

    // Mark other conversations as inactive if this is a new active conversation
    // Works for both logged-in users (by userId) and anonymous users (by anonymousId)
    if (userId) {
      // For logged-in users: mark other conversations with same userId as inactive
      await collection.updateMany(
        { userId, isActive: true, conversationId: { $ne: newConversationId } },
        { $set: { isActive: false } }
      );
    } else if (anonymousId) {
      // For anonymous users: mark other conversations with same anonymousId as inactive
      await collection.updateMany(
        { anonymousId, isActive: true, conversationId: { $ne: newConversationId } },
        { $set: { isActive: false } }
      );
    }

    // Check if conversation already exists
    const existingConversation = await collection.findOne({ conversationId: newConversationId });

    if (existingConversation) {

      const existingUserId = existingConversation.userId || null;
      const existingAnonymousId = existingConversation.anonymousId || null;

      // If existing is anonymous (has anonymousId, no userId) and we're trying to save with userId
      if (existingAnonymousId && !existingUserId && userId) {
        return;
      }

      // If existing has userId and we're trying to save with different userId
      if (existingUserId && userId && existingUserId !== userId) {
        return;
      }

      // If existing has userId and we're trying to save as anonymous
      if (existingUserId && !userId && anonymousId) {
        return;
      }

      // Update existing conversation
      const existingChatHistory = existingConversation.chatHistory || [];

      const mergedChatHistory: StoredChatMessage[] = [...existingChatHistory];

      // Update or add new messages
      chatHistoryWithIds.forEach((newMsg: StoredChatMessage) => {
        const existingIndex = mergedChatHistory.findIndex((existingMsg: StoredChatMessage) =>
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

      // Preserve existing userId/anonymousId if new values are null/undefined (e.g., after page refresh when metadata is lost)
      // Only update if we have valid new values
      const finalUserId = userId !== undefined && userId !== null ? userId : existingUserId;
      const finalAnonymousId = anonymousId !== undefined && anonymousId !== null ? anonymousId : existingAnonymousId;

      await collection.updateOne(
        { conversationId: newConversationId },
        {
          $set: {
            conversationId: newConversationId,
            userId: finalUserId,
            anonymousId: finalAnonymousId,
            chatHistory: mergedChatHistory,
            userMessage: extractUserMessageContent(lastMsg.content),
            timestamp: existingConversation.timestamp || new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            isActive: true,
            createdAt: existingConversation.createdAt || new Date().toISOString(),
          },
        }
      );
    } else {
      // Only create new conversation if we have actual messages
      if (chatHistoryWithIds.length === 0) {
        console.warn("Skipping conversation creation - no messages to save");
        return;
      }

      // Create new conversation
      const newConversationData = {
        conversationId: newConversationId,
        userId: userId || null,
        anonymousId: anonymousId || null,
        chatHistory: chatHistoryWithIds,
        userMessage: extractUserMessageContent(lastMsg.content),
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      await collection.updateOne(
        { conversationId: newConversationId },
        { $set: newConversationData },
        { upsert: true }
      );
    }

    // Delete the old conversation if it exists and is different
    if (oldConversationId && oldConversationId !== newConversationId) {
      await collection.deleteOne({ conversationId: oldConversationId });
    }

    // Clean up any empty conversations for this user (safety measure)
    // Works for both logged-in users and anonymous users
    if (userId) {
      const emptyCleanup = await collection.deleteMany({
        userId,
        $or: [
          { chatHistory: { $exists: false } },
          { chatHistory: { $eq: [] } },
          { chatHistory: { $size: 0 } },
        ],
      });
    } else if (anonymousId) {
      await collection.deleteMany({
        anonymousId,
        $or: [
          { chatHistory: { $exists: false } },
          { chatHistory: { $eq: [] } },
          { chatHistory: { $size: 0 } },
        ],
      });
    }

  } catch (error: any) {
    console.error("Error saving conversation:", error.message);
  }
}

export async function deleteConversation(
  conversationId: string,
  userId: string,
): Promise<{ deleted: boolean; reason?: string }> {
  try {
    const collection = await getCollection();
    const conversation = await collection.findOne({ conversationId });

    if (!conversation) {
      return { deleted: false, reason: "not_found" };
    }

    if (conversation.userId !== userId) {
      return { deleted: false, reason: "forbidden" };
    }

    await collection.deleteOne({ conversationId });
    return { deleted: true };
  } catch (error: any) {
    console.error("Error deleting conversation:", error.message);
    return { deleted: false, reason: "error" };
  }
}
