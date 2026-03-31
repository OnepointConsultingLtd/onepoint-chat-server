import crypto from "crypto";
import express, { RequestHandler } from "express";
import { getChatHistory, getChatHistoryWithMetadata, getCollection, formatConversationHistory, extractUserMessageContent, deleteConversation } from "./handleApi";
import { getSharesCollection } from "./mongoClient";
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

// Get reference sources for a specific message
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

// Token-based share (new) - must be before :conversationId to avoid conflict
app.post("/api/chat/share/create", (async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string | undefined;
    const anonymousId = req.headers["anonymousid"] as string | undefined;
    if (!userId && !anonymousId) {
      return res.status(401).json({ error: "x-user-id or anonymousId header required" });
    }
    const { conversationId, type, messageId } = req.body;
    if (!conversationId || !type) {
      return res.status(400).json({ error: "conversationId and type required" });
    }
    if (type !== "full" && type !== "thread") {
      return res.status(400).json({ error: "type must be 'full' or 'thread'" });
    }
    if (type === "thread" && !messageId) {
      return res.status(400).json({ error: "messageId required for thread share" });
    }
    const token = crypto.randomBytes(9).toString("base64url").slice(0, 12);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const sharesCollection = await getSharesCollection();
    await sharesCollection.createIndex({ token: 1 }, { unique: true });
    await sharesCollection.insertOne({
      token,
      type,
      conversationId,
      ...(type === "thread" && { messageId }),
      ...(userId && { userId }),
      createdAt: now,
      expiresAt,
    });
    res.json({ token });
  } catch (error: any) {
    console.error("Error creating share:", error.message);
    res.status(500).json({ error: "Failed to create share" });
  }
}) as RequestHandler);

// Get share by token
app.get("/api/chat/share/token/:token", (async (req, res) => {
  try {
    const { token } = req.params;
    const sharesCollection = await getSharesCollection();
    const share = await sharesCollection.findOne({ token });
    if (!share) {
      return res.status(404).json({ error: "Share not found" });
    }
    if (new Date() > share.expiresAt) {
      return res.status(410).json({ error: "Share expired" });
    }
    const collection = await getCollection();
    if (share.type === "full") {
      const conversation = await collection.findOne({ conversationId: share.conversationId });
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const formattedHistory = formatConversationHistory(conversation as unknown as MongoConversation);
      const filteredHistory = formattedHistory.filter(
        (msg: { role: string; content?: string }) => !(msg.role === "assistant" && isWelcomeMessage(msg.content))
      );
      const messages = filteredHistory.map((msg: { id?: string; role: string; content: string; referenceSources?: unknown[] }) => ({
        id: msg.id || `${share.conversationId}-${msg.role}-${Date.now()}`,
        text: msg.content,
        type: msg.role === "user" ? "user" : "agent",
        timestamp: new Date(conversation.timestamp || Date.now()).toISOString(),
        referenceSources: msg.referenceSources,
      }));
      return res.json({ type: "full", messages, conversationId: share.conversationId });
    }
    // type === 'thread'
    const conversation = await collection.findOne({ "chatHistory.messageId": share.messageId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const chatHistory = conversation.chatHistory.filter((msg: { role: string; content?: string }) => {
      if (msg.role === "system") return false;
      if (msg.role === "assistant" && isWelcomeMessage(msg.content)) return false;
      return true;
    });
    const messageIndex = chatHistory.findIndex((msg: { messageId?: string }) => msg.messageId === share.messageId);
    if (messageIndex === -1) {
      return res.status(404).json({ error: "Message not found" });
    }
    const targetMessage = chatHistory[messageIndex];
    const messagePair: { id?: string; role: string; content: string; referenceSources?: unknown[] }[] = [];
    if (targetMessage.role === "assistant") {
      if (messageIndex - 1 >= 0 && chatHistory[messageIndex - 1].role === "user") {
        messagePair.push(chatHistory[messageIndex - 1]);
      }
      messagePair.push(targetMessage);
    } else if (targetMessage.role === "user") {
      messagePair.push(targetMessage);
      if (messageIndex + 1 < chatHistory.length && chatHistory[messageIndex + 1].role === "assistant") {
        messagePair.push(chatHistory[messageIndex + 1]);
      }
    }
    if (messagePair.length === 0) {
      return res.status(404).json({ error: "No shareable message pair found" });
    }
    const messages = messagePair.map((msg: { id?: string; role: string; content: string; referenceSources?: unknown[] }) => ({
      id: msg.id,
      text: extractUserMessageContent(msg.content),
      type: msg.role === "user" ? "user" : "agent",
      timestamp: new Date(conversation.timestamp || Date.now()).toISOString(),
      referenceSources: msg.referenceSources,
    }));
    return res.json({ type: "thread", messages, conversationId: conversation.conversationId });
  } catch (error: any) {
    console.error("Error fetching share by token:", error.message);
    res.status(500).json({ error: "Failed to fetch share" });
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

// SPA fallback: serve index.html for non-API client-side routes (e.g. /share/:token)
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(static_files_path, "index.html"));
});

const PORT = process.env.REST_API_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
