import type { Db } from "mongodb";
import type { ChatMessage, MongoConversation, ReferenceSource, StoredChatMessage } from "../types";

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

export async function getChatHistory(db: Db, conversationId: string) {
  try {
    const collection = db.collection("conversations");

    const conversation = (await collection.findOne({ conversationId })) as MongoConversation | null;

    if (conversation) {
      return formatConversationHistory(conversation);
    }

    console.warn(`No conversations found in database for ${conversationId}`);
    return [];
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error retrieving conversation:", msg);
    return [];
  }
}

export async function getChatHistoryWithMetadata(db: Db, conversationId: string) {
  try {
    const collection = db.collection("conversations");

    const conversation = (await collection.findOne({ conversationId })) as MongoConversation | null;

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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error retrieving conversation with metadata:", msg);
    return null;
  }
}

export function formatConversationHistory(conversation: MongoConversation) {
  const history = conversation.chatHistory
    .filter((msg: StoredChatMessage) => ["assistant", "user"].includes(msg.role))
    .map((msg: StoredChatMessage) => {
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
  db: Db,
  chatHistory: ChatMessage[],
  conversationId: string,
  referenceSources?: ReferenceSource[],
  userId?: string | null,
  anonymousId?: string | null,
) {
  const oldConversationId = chatHistory[chatHistory.length - 1]?.conversationId;
  const newConversationId = conversationId;

  try {
    const collection = db.collection("conversations");
    const filteredChatHistory = chatHistory.filter((msg) => msg.role !== "system");
    const lastMsg = filteredChatHistory.at(-1);
    if (!lastMsg?.content) return;

    const chatHistoryWithIds = filteredChatHistory.map((msg) => {
      const messageData: StoredChatMessage = {
        ...msg,
        conversationId: newConversationId,
        messageId: msg.id,
      };

      if (msg.referenceSources && msg.referenceSources.length > 0) {
        messageData.referenceSources = msg.referenceSources;
      }

      return messageData;
    });

    if (referenceSources && referenceSources.length > 0) {
      const lastMessageIndex = chatHistoryWithIds.length - 1;
      if (lastMessageIndex >= 0 && chatHistoryWithIds[lastMessageIndex].role === "assistant") {
        chatHistoryWithIds[lastMessageIndex].referenceSources = referenceSources;
      }
    }

    if (userId) {
      await collection.updateMany(
        { userId, isActive: true, conversationId: { $ne: newConversationId } },
        { $set: { isActive: false } },
      );
    } else if (anonymousId) {
      await collection.updateMany(
        { anonymousId, isActive: true, conversationId: { $ne: newConversationId } },
        { $set: { isActive: false } },
      );
    }

    const existingConversation = await collection.findOne({ conversationId: newConversationId });

    if (existingConversation) {
      const existingUserId = existingConversation.userId || null;
      const existingAnonymousId = existingConversation.anonymousId || null;

      if (existingAnonymousId && !existingUserId && userId) {
        return;
      }

      if (existingUserId && userId && existingUserId !== userId) {
        return;
      }

      if (existingUserId && !userId && anonymousId) {
        return;
      }

      const existingChatHistory = existingConversation.chatHistory || [];

      const mergedChatHistory: StoredChatMessage[] = [...existingChatHistory];

      chatHistoryWithIds.forEach((newMsg: StoredChatMessage) => {
        const existingIndex = mergedChatHistory.findIndex(
          (existingMsg: StoredChatMessage) =>
            existingMsg.id === newMsg.id || existingMsg.messageId === newMsg.messageId,
        );

        if (existingIndex >= 0) {
          mergedChatHistory[existingIndex] = {
            ...mergedChatHistory[existingIndex],
            ...newMsg,
            referenceSources: newMsg.referenceSources || mergedChatHistory[existingIndex].referenceSources,
          };
        } else {
          mergedChatHistory.push(newMsg);
        }
      });

      const finalUserId = userId !== undefined && userId !== null ? userId : existingUserId;
      const finalAnonymousId =
        anonymousId !== undefined && anonymousId !== null ? anonymousId : existingAnonymousId;

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
        },
      );
    } else {
      if (chatHistoryWithIds.length === 0) {
        console.warn("Skipping conversation creation - no messages to save");
        return;
      }

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

      await collection.updateOne({ conversationId: newConversationId }, { $set: newConversationData }, { upsert: true });
    }

    if (oldConversationId && oldConversationId !== newConversationId) {
      await collection.deleteOne({ conversationId: oldConversationId });
    }

    if (userId) {
      await collection.deleteMany({
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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error saving conversation:", msg);
  }
}

export async function deleteConversation(
  db: Db,
  conversationId: string,
  userId: string,
): Promise<{ deleted: boolean; reason?: string }> {
  try {
    const collection = db.collection("conversations");
    const conversation = await collection.findOne({ conversationId });

    if (!conversation) {
      return { deleted: false, reason: "not_found" };
    }

    if (conversation.userId !== userId) {
      return { deleted: false, reason: "forbidden" };
    }

    await collection.deleteOne({ conversationId });
    return { deleted: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error deleting conversation:", msg);
    return { deleted: false, reason: "error" };
  }
}
