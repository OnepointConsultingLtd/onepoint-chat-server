import express, { RequestHandler } from "express";
import { getChatHistory, getChatHistoryWithMetadata, getCollection, formatConversationHistory, extractUserMessageContent, deleteConversation } from "./handleApi";
import type { MongoConversation } from "../types";
import { isWelcomeMessage } from "../utils/isWelcomeMessage";
import { getVerifiedUserId } from "./verifyClerkAuth";
import cors from "cors";
import path from "path";

const ALLOWED_ORIGINS = ["https://osca.onepointltd.ai", "http://localhost:5173", "http://localhost:3000"];

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));

// Serve static files from the dist directory
const static_files_path = path.join(__dirname, "../../onepoint-chat-ui/dist");
app.use(express.static(static_files_path));
console.log(`Serving static files from ${static_files_path}`);

// ?metadata=true to include isActive, userId, anonymousId alongside messages
app.get("/api/chat/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const includeMetadata = req.query.metadata === 'true';

    if (includeMetadata) {
      // Return history with metadata (isActive, userId, anonymousId, etc.)
      const result = await getChatHistoryWithMetadata(conversationId);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Conversation not found" });
      }
    } else {
      // Return only chat history (backward compatible)
      const history = await getChatHistory(conversationId);
      res.json(history);
    }
  } catch (error: any) {
    console.error("Error fetching chat history:", error.message);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
}) as RequestHandler);

app.get("/api/chat/:conversationId/message/:messageId/references", (async (req, res) => {
  try {
    const { conversationId, messageId } = req.params;
    const collection = await getCollection();

    const conversation = await collection.findOne({ conversationId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Find the specific message with reference sources
    const message = conversation.chatHistory.find((msg: { id?: string; messageId?: string }) => msg.id === messageId || msg.messageId === messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const referenceSources = message.referenceSources || [];
    res.json({ referenceSources });
  } catch (error: any) {
    console.error("Error fetching reference sources:", error.message);
    res.status(500).json({ error: "Failed to fetch reference sources" });
  }
}) as RequestHandler);

app.get("/api/chat/share/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const collection = await getCollection();

    // Get the full conversation document
    const conversation = await collection.findOne({ conversationId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const formattedHistory = formatConversationHistory(conversation as unknown as MongoConversation);

    const shareData = {
      messages: formattedHistory.map((msg: { id?: string; role: string; content: string; referenceSources?: unknown[] }) => ({
        id: msg.id || `${conversationId}-${msg.role}-${Date.now()}`,
        text: msg.content,
        type: msg.role === 'user' ? 'user' : 'agent',
        timestamp: new Date(conversation.timestamp || Date.now()).toISOString(),
        conversationId: conversation.conversationId,
        sessionId: conversation.conversationId,
        referenceSources: msg.referenceSources,
      })),
      conversationId: conversation.conversationId,
    };

    res.json(shareData);
  } catch (error: any) {
    console.error("Error fetching shared chat:", error.message);
    res.status(500).json({ error: "Failed to fetch shared chat" });
  }
}) as RequestHandler);


app.get("/api/chat/thread-share/:messageId", (async (req, res) => {
  try {
    const collection = await getCollection();

    const messageId = req.params.messageId;

    const conversation = await collection.findOne({
      "chatHistory.messageId": messageId
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }


    // Filter out system messages and welcome message
    const chatHistory = conversation.chatHistory.filter((msg: { role: string; content?: string }) => {
      if (msg.role === "system") return false;
      if (msg.role === "assistant" && isWelcomeMessage(msg.content)) return false;
      return true;
    });

    const messageIndex = chatHistory.findIndex((msg: { messageId?: string }) => msg.messageId === messageId);
    if (messageIndex === -1) {
      return res.status(404).json({ error: "Message not found or is not shareable" });
    }

    type MessagePair = { id?: string; role: string; content: string; referenceSources?: unknown[] };
    const messagePair: MessagePair[] = [];
    const targetMessage = chatHistory[messageIndex];

    if (targetMessage.role === 'assistant') {
      // Get previous user message + this assistant message
      if (messageIndex - 1 >= 0 && chatHistory[messageIndex - 1].role === 'user') {
        messagePair.push(chatHistory[messageIndex - 1]); // User message first
      }
      messagePair.push(targetMessage); // Assistant message second
    } else if (targetMessage.role === 'user') {
      // Get this user message + next assistant message
      messagePair.push(targetMessage); // User message first
      if (messageIndex + 1 < chatHistory.length && chatHistory[messageIndex + 1].role === 'assistant') {
        messagePair.push(chatHistory[messageIndex + 1]); // Assistant message second
      }
    } else {
      // If somehow we get a non-user/assistant message, return error
      return res.status(400).json({ error: "Share is only available for user and assistant messages" });
    }

    if (messagePair.length === 0) {
      return res.status(404).json({ error: "No shareable message pair found" });
    }


    const shareData = {
      messages: messagePair.map((msg: MessagePair) => ({
        text: extractUserMessageContent(msg.content),
        type: msg.role === 'user' ? 'user' : 'agent',
        timestamp: new Date(conversation.timestamp || Date.now()).toISOString(),
        conversationId: conversation.conversationId,
        messageId: msg.id,
        referenceSources: msg.referenceSources,
      })),
      conversationId: conversation.conversationId,
    };

    res.json(shareData);
  } catch (error: any) {
    console.error("Error fetching shared message pair:", error.message);
    res.status(500).json({ error: "Failed to fetch shared message pair" });
  }
}) as RequestHandler);


app.get("/api/conversations/user/:userId", (async (req, res) => {
  try {
    const { userId } = req.params;
    const collection = await getCollection();

    const conversations = await collection
      .find({ userId })
      .sort({ lastUpdated: -1 })
      .limit(50)
      .toArray();

    const conversationList = conversations.map(conv => ({
      conversationId: conv.conversationId,
      userMessage: conv.userMessage,
      timestamp: conv.timestamp,
      lastUpdated: conv.lastUpdated,
      messageCount: conv.chatHistory?.length || 0,
      isActive: conv.isActive || false,
      chatHistory: conv.chatHistory,
    }));

    res.json({ conversations: conversationList });
  } catch (error: any) {
    console.error("Error fetching user conversations:", error.message);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
}) as RequestHandler);


app.delete("/api/conversations/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = await getVerifiedUserId(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await deleteConversation(conversationId, userId);

    if (!result.deleted) {
      const status = result.reason === "not_found" ? 404
        : result.reason === "forbidden" ? 403
        : 500;
      return res.status(status).json({ error: result.reason });
    }

    res.json({ deleted: true });
  } catch (error: any) {
    console.error("Error deleting conversation:", error.message);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
}) as RequestHandler);

const PORT = process.env.REST_API_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
