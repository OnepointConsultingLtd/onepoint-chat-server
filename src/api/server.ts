import cors from "cors";
import crypto from "crypto";
import express, { RequestHandler, Router } from "express";
import path from "path";
import { deleteClientDoc, getCachedAllowedOrigins, getClientDb, insertClientDoc, listAllClients, updateClientDoc } from "../db/registry";
import { resolveClient } from "../middleware/resolveClient";
import type { MongoConversation } from "../types";
import type { ClientDocument } from "../types/clientDocument";
import type { LLMProviderName } from "../types/enums";
import { sanitizeTenantPublicBranding } from "../types/tenantPublicBranding";
import { isWelcomeMessage } from "../utils/isWelcomeMessage";
import {
  deleteConversation,
  extractUserMessageContent,
  formatConversationHistory,
  getChatHistory,
  getChatHistoryWithMetadata,
} from "./handleApi";
import { getVerifiedUserId } from "./verifyClerkAuth";

/**
 * Express app, REST routes, static file serving
 * This is the main entry point for the API.
 * It handles CORS, JSON parsing, static file serving, and API routes.
 * It also uses the `resolveClient` middleware to set the `client` and `clientDb` properties on the request object.
 * @see {@link middleware/resolveClient.ts}
 * @see {@link types/clientDocument.ts}
 * @see {@link types/enums.ts} - LLM provider enums
 * @see {@link types/tenantPublicBranding.ts} - Tenant public branding
 * @see {@link utils/isWelcomeMessage.ts} - Is welcome message utility
 * @see {@link handleApi.ts} - API routes
 * @see {@link verifyClerkAuth.ts} - Clerk authentication
 */


const app = express();
app.use(express.json({ limit: "50mb" }));


  // Check if the origin is a local development HTTP origin
function isLocalDevHttpOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    return u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

// Configure CORS
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      const allowed = getCachedAllowedOrigins();
      // Check if the origin is in the allowed origins
      if (allowed.includes(origin)) {
        callback(null, true);
        return;
      }
      if (process.env.NODE_ENV !== "production" && isLocalDevHttpOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },

    // Allow credentials
    credentials: true,
    // Allow the following headers
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Osca-Token",
      "X-Admin-Secret",
      "x-user-id",
      "anonymousid",
    ],
  }),
);


// Require admin authentication
function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    res.status(503).json({ error: "ADMIN_SECRET is not configured" });
    return;
  }
  const hdr = req.headers["x-admin-secret"];
  if (hdr !== secret) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

const static_files_path = path.join(__dirname, "../../onepoint-chat-ui/dist");
app.use(express.static(static_files_path));
console.log(`Serving static files from ${static_files_path}`);

const chatRouter = Router();
chatRouter.use(resolveClient);

// Get a share by token
chatRouter.get("/share/token/:token", (async (req, res) => {
  try {
    const { token: shareToken } = req.params;
    let ownerClient = req.client!;
    let db = req.clientDb!;
    let sharesCollection = db.collection("shares");
    let share = await sharesCollection.findOne({ token: shareToken });

    // Fallback: if token isn't in the currently resolved tenant DB, scan other tenant DBs.
    // This keeps clean share URLs working across tenants without requiring oscaToken in URL.
    if (!share) {
      const clients = await listAllClients();
      for (const client of clients) {
        if (client._id === req.client?._id) continue;
        const tenantDb = await getClientDb(client.dbName);
        const tenantShares = tenantDb.collection("shares");
        const candidate = await tenantShares.findOne({ token: shareToken });
        if (candidate) {
          ownerClient = client;
          db = tenantDb;
          sharesCollection = tenantShares;
          share = candidate;
          break;
        }
      }
    }

    if (!share) {
      return res.status(404).json({ error: "Share not found" });
    }
    if (new Date() > share.expiresAt) {
      return res.status(410).json({ error: "Share expired" });
    }
    const shareBranding = sanitizeTenantPublicBranding(ownerClient.publicBranding);
    const collection = db.collection("conversations");
    if (share.type === "full") {
      const conversation = await collection.findOne({ conversationId: share.conversationId });
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const formattedHistory = formatConversationHistory(conversation as unknown as MongoConversation);
      const filteredHistory = formattedHistory.filter(
        (msg: { role: string; content?: string }) => !(msg.role === "assistant" && isWelcomeMessage(msg.content)),
      );
      const messages = filteredHistory.map(
        (msg: { id?: string; role: string; content: string; referenceSources?: unknown[] }) => ({
          id: msg.id || `${share.conversationId}-${msg.role}-${Date.now()}`,
          text: msg.content,
          type: msg.role === "user" ? "user" : "agent",
          timestamp: new Date(conversation.timestamp || Date.now()).toISOString(),
          referenceSources: msg.referenceSources,
        }),
      );
      return res.json({
        type: "full",
        messages,
        conversationId: share.conversationId,
        tenantName: ownerClient.name,
        tenantProjectName: ownerClient.projectName,
        ...(shareBranding ? { publicBranding: shareBranding } : {}),
      });
    }
    const conversation = await collection.findOne({
      $or: [
        { "chatHistory.messageId": share.messageId },
        { "chatHistory.id": share.messageId },
      ],
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const chatHistory = conversation.chatHistory.filter((msg: { role: string; content?: string }) => {
      if (msg.role === "system") return false;
      if (msg.role === "assistant" && isWelcomeMessage(msg.content)) return false;
      return true;
    });
    const messageIndex = chatHistory.findIndex(
      (msg: { messageId?: string; id?: string }) =>
        msg.messageId === share.messageId || msg.id === share.messageId,
    );
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
    return res.json({
      type: "thread",
      messages,
      conversationId: conversation.conversationId,
      tenantName: ownerClient.name,
      tenantProjectName: ownerClient.projectName,
      ...(shareBranding ? { publicBranding: shareBranding } : {}),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error fetching share by token:", msg);
    res.status(500).json({ error: "Failed to fetch share" });
  }
}) as RequestHandler);

// Create a share for a conversation in the current tenant
chatRouter.post("/share/create", (async (req, res) => {
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
    let normalizedMessageId: string | undefined = undefined;
    if (type === "thread") {
      const conv = await req.clientDb!.collection("conversations").findOne({ conversationId });
      if (!conv) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const history = Array.isArray(conv.chatHistory) ? conv.chatHistory : [];
      const matched = history.find(
        (m: { messageId?: string; id?: string }) =>
          m.messageId === messageId || m.id === messageId,
      ) as { messageId?: string; id?: string } | undefined;
      if (!matched) {
        return res.status(400).json({ error: "Invalid messageId for this conversation" });
      }
      normalizedMessageId = matched.messageId || matched.id;
    }
    const token = crypto.randomBytes(9).toString("base64url").slice(0, 12);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const sharesCollection = req.clientDb!.collection("shares");
    await sharesCollection.createIndex({ token: 1 }, { unique: true });
    await sharesCollection.insertOne({
      token,
      type,
      conversationId,
      ...(type === "thread" && { messageId: normalizedMessageId }),
      ...(userId && { userId }),
      ...(anonymousId && { anonymousId }),
      createdAt: now,
      expiresAt,
    });
    res.json({ token });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error creating share:", msg);
    res.status(500).json({ error: "Failed to create share" });
  }
}) as RequestHandler);

// Get the reference sources for a message
chatRouter.get("/:conversationId/message/:messageId/references", (async (req, res) => {
  try {
    const { conversationId, messageId } = req.params;
    const collection = req.clientDb!.collection("conversations");

    const conversation = await collection.findOne({ conversationId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = conversation.chatHistory.find((msg: { id?: string; messageId?: string }) => msg.id === messageId || msg.messageId === messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const referenceSources = message.referenceSources || [];
    res.json({ referenceSources });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error fetching reference sources:", msg);
    res.status(500).json({ error: "Failed to fetch reference sources" });
  }
}) as RequestHandler);

// Get the chat history for a conversation
chatRouter.get("/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const includeMetadata = req.query.metadata === "true";
    const db = req.clientDb!;

    if (includeMetadata) {
      const result = await getChatHistoryWithMetadata(db, conversationId);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Conversation not found" });
      }
    } else {
      const history = await getChatHistory(db, conversationId);
      res.json(history);
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error fetching chat history:", msg);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
}) as RequestHandler);

// Get the user conversations
app.use("/api/chat", chatRouter);

const conversationsRouter = Router();
conversationsRouter.use(resolveClient);


// Get the user conversations
conversationsRouter.get("/user/:userId", (async (req, res) => {
  try {
    const { userId } = req.params;
    const collection = req.clientDb!.collection("conversations");

    const conversations = await collection
      .find({ userId })
      .sort({ lastUpdated: -1 })
      .limit(50)
      .toArray();

    const conversationList = conversations.map((conv) => ({
      conversationId: conv.conversationId,
      userMessage: conv.userMessage,
      timestamp: conv.timestamp,
      lastUpdated: conv.lastUpdated,
      messageCount: conv.chatHistory?.length || 0,
      isActive: conv.isActive || false,
      chatHistory: conv.chatHistory,
    }));

    res.json({ conversations: conversationList });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error fetching user conversations:", msg);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
}) as RequestHandler);

// Delete a conversation
conversationsRouter.delete("/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = await getVerifiedUserId(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await deleteConversation(req.clientDb!, conversationId, userId);

    if (!result.deleted) {
      const status =
        result.reason === "not_found" ? 404 : result.reason === "forbidden" ? 403 : 500;
      return res.status(status).json({ error: result.reason });
    }

    res.json({ deleted: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error deleting conversation:", msg);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
}) as RequestHandler);


// Conversations API
app.use("/api/conversations", conversationsRouter);

const tenantRouter = Router();
tenantRouter.use(resolveClient);

// Get the tenant context
tenantRouter.get("/context", ((req, res) => {
  const c = req.client!;
  const publicBranding = sanitizeTenantPublicBranding(c.publicBranding);
  res.json({
    projectName: c.projectName,
    name: c.name,
    clientId: c._id,
    topicsPrompt: c.topicsPrompt ?? "",
    predefinedQuickQuestions: c.predefinedQuickQuestions ?? [],
    ...(publicBranding ? { publicBranding } : {}),
  });
}) as RequestHandler);
app.use("/api/tenant", tenantRouter);

// Get all clients
app.get("/admin/clients", requireAdmin, async (_req, res) => {
  try {
    const clients = await listAllClients();
    res.json(clients);
    return;
  } catch (e: unknown) {
    res.status(500).json({ error: String(e) });
  }
});

// Create a new client
app.post("/admin/clients", requireAdmin, async (req, res) => {
  try {
    const b = req.body as Partial<ClientDocument>;
    if (!b.name || !b.projectName || !b.dbName || !b.domains?.length) {
      res.status(400).json({ error: "name, projectName, dbName, and domains[] are required" });
      return;
    }
    const token = b.token || `osca_live_${crypto.randomBytes(24).toString("hex")}`;
    const doc = await insertClientDoc({
      name: b.name,
      projectName: b.projectName,
      token,
      domains: b.domains,
      provider: (b.provider as LLMProviderName) || "openai",
      model: b.model || "gpt-4o",
      prompt: typeof b.prompt === "string" ? b.prompt : "",
      dbName: b.dbName,
      active: b.active !== false,
      ...(typeof b.topicsPrompt === "string" ? { topicsPrompt: b.topicsPrompt } : {}),
      ...(Array.isArray(b.predefinedQuickQuestions)
        ? { predefinedQuickQuestions: b.predefinedQuickQuestions }
        : {}),
      ...(b.publicBranding !== undefined
        ? (() => {
            const pb = sanitizeTenantPublicBranding(b.publicBranding);
            return pb ? { publicBranding: pb } : {};
          })()
        : {}),
    });
    res.status(201).json(doc);
    return;
  } catch (e: unknown) {
    res.status(500).json({ error: String(e) });
  }
});

// Update a client
app.put("/admin/clients/:id", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Partial<Omit<ClientDocument, "_id" | "createdAt">> & { publicBranding?: unknown };
    const patch = { ...body } as Partial<Omit<ClientDocument, "_id" | "createdAt">>;
    delete (patch as { _id?: unknown })._id;
    delete (patch as { createdAt?: unknown }).createdAt;

    let unset: Record<string, 1> | undefined;
    if ("publicBranding" in body) {
      delete patch.publicBranding;
      const pb = sanitizeTenantPublicBranding(body.publicBranding);
      if (pb) patch.publicBranding = pb;
      else unset = { publicBranding: 1 };
    }

    const updated = await updateClientDoc(req.params.id, patch, unset);
    if (!updated) {
      res.status(404).json({ error: "Client not found" });
      return;
    }
    res.json(updated);
    return;
  } catch (e: unknown) {
    res.status(500).json({ error: String(e) });
  }
});

// Delete a client
app.delete("/admin/clients/:id", requireAdmin, async (req, res) => {
  try {
    const ok = await deleteClientDoc(req.params.id);
    if (!ok) {
      res.status(404).json({ error: "Client not found" });
      return;
    }
    res.json({ deleted: true });
    return;
  } catch (e: unknown) {
    res.status(500).json({ error: String(e) });
  }
});

// Regenerate a client token
app.post("/admin/clients/:id/regen-token", requireAdmin, async (req, res) => {
  try {
    const newToken = `osca_live_${crypto.randomBytes(24).toString("hex")}`;
    const updated = await updateClientDoc(req.params.id, { token: newToken });
    if (!updated) {
      res.status(404).json({ error: "Client not found" });
      return;
    }
    res.json(updated);
    return;
  } catch (e: unknown) {
    res.status(500).json({ error: String(e) });
  }
});

// Serve the static files
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(static_files_path, "index.html"));
});

export default app;