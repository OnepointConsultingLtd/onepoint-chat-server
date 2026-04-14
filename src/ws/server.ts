import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { v7 as uuidv7 } from "uuid";
import {
  ChatMessage,
  Conversation,
  MessageType,
  MessageSubtype,
  Role,
  type PromptConfig,
} from "../types";
import { streamLLM } from "../service/llm";
import { onepointCallback } from "../callbacks/onepoint";
import { saveChatHistory } from "../api/handleApi";
import { parsePrompt } from "../utils/prompts";
import { getClientByToken, getClientDb, isOriginAllowedForClient, getCachedAllowedOrigins } from "../db/registry";
import type { ClientDocument } from "../types/clientDocument";

const conversations = new Map<string, Conversation>();

const httpServer = http.createServer((req, res) => {
  const origin = req.headers.origin;
  const allowed = getCachedAllowedOrigins();
  if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (origin && allowed.length > 0) {
    res.setHeader("Access-Control-Allow-Origin", allowed[0]);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Osca-Token");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ noServer: true });

const WS_CLOSE_UNAUTHORIZED = 4001;

httpServer.on("upgrade", (request, socket, head) => {
  void (async () => {
    try {
      const url = new URL(request.url ?? "/", "http://localhost");
      const token = url.searchParams.get("token")?.trim();
      if (!token) {
        console.warn("[ws] upgrade rejected: missing ?token=");
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }
      const tenant = await getClientByToken(token);
      if (!tenant || !tenant.active) {
        console.warn(
          "[ws] upgrade rejected: no registry client for this token (check osca-registry.clients.token matches UI ONE_TIME_TOKEN / VITE_OSCA_CLIENT_TOKEN)",
        );
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }
      const origin = request.headers.origin;
      if (!isOriginAllowedForClient(origin, tenant)) {
        console.warn(
          `[ws] upgrade rejected: origin not in client.domains (origin=${origin ?? "none"}, client=${tenant.projectName})`,
        );
        socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
        socket.destroy();
        return;
      }
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request, tenant);
      });
    } catch (err) {
      console.error("WebSocket upgrade error:", err);
      socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
      socket.destroy();
    }
  })();
});

function sendJSON(ws: WebSocket, data: Record<string, unknown>) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

function createInitialSystemMessage(promptConfig: PromptConfig): ChatMessage {
  return {
    id: uuidv7(),
    role: Role.SYSTEM,
    content: promptConfig.basic.system_message,
  };
}

function getWelcomeMessage(promptConfig: PromptConfig): string {
  const questions = promptConfig.basic.initial_questions;
  return questions?.[0] || "Welcome to Onepoint. How can I help you today?";
}

async function handleUserMessage(conversation: Conversation, content: string) {
  const { ws, id: conversationId, tenant, promptConfig } = conversation;

  const userMessage: ChatMessage = {
    id: uuidv7(),
    role: Role.USER,
    content,
  };
  conversation.chatHistory.push(userMessage);

  try {
    const result = await onepointCallback(
      conversation.chatHistory,
      promptConfig,
      tenant.provider,
      tenant.projectName,
    );
    const messagesForLLM = result.chatHistory;
    const referenceSources = result.referenceSources;

    sendJSON(ws, {
      type: MessageType.STREAM_START,
      message: { role: Role.ASSISTANT, content: "" },
    });

    let fullResponse = "";
    for await (const chunk of streamLLM({
      messages: messagesForLLM,
      provider: tenant.provider,
      model: tenant.model,
    })) {
      fullResponse += chunk;
      sendJSON(ws, { type: MessageType.STREAM_CHUNK, chunk });
    }

    const assistantMessage: ChatMessage = {
      id: uuidv7(),
      role: Role.ASSISTANT,
      content: fullResponse,
    };
    conversation.chatHistory.push(assistantMessage);

    sendJSON(ws, {
      type: MessageType.STREAM_END,
      message: assistantMessage,
    });

    const db = await getClientDb(tenant.dbName);
    await saveChatHistory(
      db,
      conversation.chatHistory,
      conversationId,
      referenceSources,
      conversation.metadata.userId,
      conversation.metadata.anonymousId,
    );
  } catch (error) {
    console.error("Error handling message:", error);
    sendJSON(ws, {
      type: MessageType.STREAM_END,
      subType: MessageSubtype.STREAM_END_ERROR,
      message: "Error generating response",
    });
  }
}

async function handleImportHistory(
  conversation: Conversation,
  history: ChatMessage[],
  newConversationId?: string,
) {
  if (!history || history.length === 0) {
    console.warn("import-history received with no messages, skipping");
    return;
  }

  if (newConversationId) {
    conversations.delete(conversation.id);
    conversation.id = newConversationId;
    conversations.set(newConversationId, conversation);
  }

  conversation.chatHistory = [
    createInitialSystemMessage(conversation.promptConfig),
    ...history.map((h) => (h.id ? h : { ...h, id: uuidv7() })),
  ];

  try {
    const db = await getClientDb(conversation.tenant.dbName);
    await saveChatHistory(
      db,
      conversation.chatHistory,
      conversation.id,
      undefined,
      conversation.metadata.userId,
      conversation.metadata.anonymousId,
    );
  } catch (error) {
    console.error("Error persisting imported history:", error);
  }
}

wss.on("connection", (ws: WebSocket, request: http.IncomingMessage, tenant: ClientDocument) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const anonymousId = url.searchParams.get("anonymousId") ?? undefined;
  const userId = url.searchParams.get("userId") ?? undefined;

  const promptConfig = parsePrompt(tenant.prompt);
  const conversationId = uuidv7();
  const conversation: Conversation = {
    id: conversationId,
    ws,
    chatHistory: [createInitialSystemMessage(promptConfig)],
    metadata: { anonymousId, userId },
    tenant,
    promptConfig,
  };
  conversations.set(conversationId, conversation);

  console.log(
    `Conversation ${conversationId} started (tenant=${tenant.projectName}, userId=${userId ?? "none"}, anonymousId=${anonymousId ?? "none"})`,
  );

  sendJSON(ws, {
    type: MessageType.CONVERSATION_ID,
    conversationId,
  });

  const welcomeContent = getWelcomeMessage(promptConfig);
  const welcomeMessage: ChatMessage = {
    id: uuidv7(),
    role: Role.ASSISTANT,
    content: welcomeContent,
    isWelcome: true,
  };
  conversation.chatHistory.push(welcomeMessage);

  sendJSON(ws, {
    type: MessageType.MESSAGE,
    message: { role: Role.ASSISTANT, content: welcomeContent, isWelcome: true },
    welcome: true,
  });

  ws.on("message", async (raw) => {
    try {
      const data = JSON.parse(raw.toString()) as {
        type?: string;
        content?: string;
        history?: ChatMessage[];
        conversationId?: string;
        metadata?: { userId?: string; anonymousId?: string };
      };

      if (data.metadata) {
        conversation.metadata = {
          userId: data.metadata.userId ?? conversation.metadata.userId,
          anonymousId: data.metadata.anonymousId ?? conversation.metadata.anonymousId,
        };
        console.log(`[ws] metadata updated:`, conversation.metadata);
      }

      switch (data.type) {
        case "message":
          if (typeof data.content === "string") {
            await handleUserMessage(conversation, data.content);
          }
          break;

        case "request-conversation-id":
          sendJSON(ws, {
            type: MessageType.CONVERSATION_ID,
            conversationId: conversation.id,
          });
          break;

        case "import-history":
          if (Array.isArray(data.history)) {
            await handleImportHistory(conversation, data.history, data.conversationId);
          }
          break;

        case "heartbeat":
          break;

        default:
          console.warn(`Unknown message type: ${data.type}`);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
      sendJSON(ws, {
        type: MessageType.ERROR,
        message: "Invalid message format",
      });
    }
  });

  ws.on("close", () => {
    console.log(`Conversation ${conversationId} closed`);
    conversations.delete(conversationId);
  });
});

export function startWebSocketServer(port: number) {
  httpServer.listen(port, () => {
    console.log(`WebSocket server running on port ${port}`);
  });
  return httpServer;
}

export { WS_CLOSE_UNAUTHORIZED };
