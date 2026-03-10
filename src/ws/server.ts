import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { v7 as uuidv7 } from "uuid";
import {
  ChatMessage,
  Conversation,
  MessageType,
  MessageSubtype,
  Role,
} from "../types";
import { streamLLM } from "../service/llm";
import { onepointCallback } from "../callbacks/onepoint";
import { saveChatHistory } from "../api/handleApi";
import { readPrompts } from "../utils/prompts";

const conversations = new Map<string, Conversation>();

const ALLOWED_ORIGINS = ["https://osca.onepointltd.ai", "http://localhost:5173", "http://localhost:3000"];

const httpServer = http.createServer((_req, res) => {
  const origin = _req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (_req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ noServer: true });

httpServer.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

function sendJSON(ws: WebSocket, data: Record<string, any>) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }
}

function createInitialSystemMessage(): ChatMessage {
  const prompts = readPrompts();
  return {
    id: uuidv7(),
    role: Role.SYSTEM,
    content: prompts.basic.system_message,
  };
}

function getWelcomeMessage(): string {
  const prompts = readPrompts();
  const questions = prompts.basic.initial_questions;
  return questions?.[0] || "Welcome to Onepoint. How can I help you today?";
}

async function handleUserMessage(conversation: Conversation, content: string) {
  const { ws, id: conversationId } = conversation;

  const userMessage: ChatMessage = {
    id: uuidv7(),
    role: Role.USER,
    content,
  };
  conversation.chatHistory.push(userMessage);

  try {
    const result = await onepointCallback(conversation.chatHistory);
    const messagesForLLM = result.chatHistory;
    const referenceSources = result.referenceSources;

    sendJSON(ws, {
      type: MessageType.STREAM_START,
      message: { role: Role.ASSISTANT, content: "" },
    });

    let fullResponse = "";
    for await (const chunk of streamLLM(messagesForLLM)) {
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

    await saveChatHistory(
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
    createInitialSystemMessage(),
    ...history.map((h) => (h.id ? h : { ...h, id: uuidv7() })),
  ];

  try {
    await saveChatHistory(
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

wss.on("connection", (ws: WebSocket, request: http.IncomingMessage) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const anonymousId = url.searchParams.get("anonymousId") ?? undefined;
  const userId = url.searchParams.get("userId") ?? undefined;

  const conversationId = uuidv7();
  const conversation: Conversation = {
    id: conversationId,
    ws,
    chatHistory: [createInitialSystemMessage()],
    metadata: { anonymousId, userId },
  };
  conversations.set(conversationId, conversation);

  console.log(`Conversation ${conversationId} started (userId=${userId ?? "none"}, anonymousId=${anonymousId ?? "none"})`);

  sendJSON(ws, {
    type: MessageType.CONVERSATION_ID,
    conversationId,
  });

  const welcomeContent = getWelcomeMessage();
  const welcomeMessage: ChatMessage = {
    id: uuidv7(),
    role: Role.ASSISTANT,
    content: welcomeContent,
  };
  conversation.chatHistory.push(welcomeMessage);

  sendJSON(ws, {
    type: MessageType.MESSAGE,
    message: { role: Role.ASSISTANT, content: welcomeContent },
  });

  ws.on("message", async (raw) => {
    try {
      const data = JSON.parse(raw.toString());

      if (data.metadata) {
        conversation.metadata = {
          userId: data.metadata.userId ?? conversation.metadata.userId,
          anonymousId: data.metadata.anonymousId ?? conversation.metadata.anonymousId,
        };
        console.log(`[ws] metadata updated:`, conversation.metadata);
      }

      switch (data.type) {
        case "message":
          await handleUserMessage(conversation, data.content);
          break;

        case "request-conversation-id":
          sendJSON(ws, {
            type: MessageType.CONVERSATION_ID,
            conversationId: conversation.id,
          });
          break;

        case "import-history":
          await handleImportHistory(conversation, data.history, data.conversationId);
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
