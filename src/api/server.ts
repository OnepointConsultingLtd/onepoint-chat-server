import express, { RequestHandler } from "express";
import { getChatHistory, getCollection, formatConversationHistory, extractUserMessageContent } from "./handleApi";
import cors from "cors";
import path from "path";
import wkhtmltopdf from "wkhtmltopdf";

/**
 * This is the server that will be used to fetch the chat history for a client ID
 */

const app = express();
app.use(express.json({ limit: "50mb" })); // Increased limit for HTML content
app.use(cors());

// Serve static files from the dist directory
const static_files_path = path.join(__dirname, "../../onepoint-chat-ui/dist");
app.use(express.static(static_files_path));
console.log(`Serving static files from ${static_files_path}`);

/**
 * Endpoint: /api/chat/:conversationId
 * Description: Get chat history for a given conversation ID
 * 
 * This endpoint retrieves the chat history for a given conversation ID.
 * It returns the entire conversation history for the given conversation ID.
 */


app.get("/api/chat/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const history = await getChatHistory(conversationId);
    res.json(history);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
}) as RequestHandler);

/**
 * Endpoint: /api/chat/:conversationId/message/:messageId/references
 * Description: Get reference sources for a specific message
 * example:
 * http://localhost:5000/api/chat/123/message/456/references
 * 
 * This endpoint retrieves the reference sources for a specific message in a given conversation.
 * It returns the reference sources for the message.
 * 
 * This endpoint is used to get the reference sources for a specific message in a given conversation.
 * It returns the reference sources for the message.
 */


app.get("/api/chat/:conversationId/message/:messageId/references", (async (req, res) => {
  try {
    const { conversationId, messageId } = req.params;
    const collection = await getCollection();

    const conversation = await collection.findOne({ conversationId });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Find the specific message with reference sources
    const message = conversation.chatHistory.find((msg: any) => msg.id === messageId || msg.messageId === messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    const referenceSources = message.referenceSources || [];
    console.log('Reference sources for message', messageId, referenceSources);
    res.json({ referenceSources });
  } catch (error) {
    console.error("Error fetching reference sources:", error);
    res.status(500).json({ error: "Failed to fetch reference sources" });
  }
}) as RequestHandler);

/**
 * Endpoint: /api/chat/share/:conversationId
 * Description: Share a conversation based on a conversation ID
 * 
 * This endpoint retrieves a conversation based on a given conversation ID.
 * It formats the chat history for sharing and returns a list of messages.
 * 
 * This endpoint share the entire conversation history for a given conversation ID.
 */


app.get("/api/chat/share/:conversationId", (async (req, res) => {
  try {
    const { conversationId } = req.params;
    const collection = await getCollection();

    // Get the full conversation document
    const conversation = await collection.findOne({ conversationId });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Format the chat history for sharing
    const formattedHistory = formatConversationHistory(conversation);

    const shareData = {
      messages: formattedHistory.map((msg: any) => ({
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

    console.log("shareData for conversationId", conversationId, shareData);
    res.json(shareData);
  } catch (error) {
    console.error("Error fetching shared chat:", error);
    res.status(500).json({ error: "Failed to fetch shared chat" });
  }
}) as RequestHandler);


/**
 * Endpoint: /api/chat/thread-share/:messageId
 * Description: Share a thread of messages based on a message ID
 * 
 * This endpoint retrieves a thread of messages based on a given message ID.
 * It filters out system messages and the welcome message, and returns a list of messages
 * that form a complete conversation thread.
 * 
 * Example:
 * http://localhost:5000/api/chat/thread-share/d0f39cf5-b13b-41f0-9e66-fe70df50b248
 */

app.get("/api/chat/thread-share/:messageId", (async (req, res) => {
  try {
    const collection = await getCollection();

    const messageId = req.params.messageId;

    console.log('messageId is in>>>>', messageId);

    // Get the full conversation document
    const conversation = await collection.findOne({
      "chatHistory.messageId": messageId
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }


    console.log('conversation is', conversation);
    // Filter out system messages and welcome message
    const chatHistory = conversation.chatHistory.filter((msg: any) => {
      if (msg.role === 'system') return false;

      if (msg.role === 'assistant' && msg.content.includes("Welcome to Onepoint")) return false;

      return true;
    });

    // Find the specific message and its pair in filtered history
    const messageIndex = chatHistory.findIndex((msg: any) => msg.messageId === messageId);

    if (messageIndex === -1) {
      return res.status(404).json({ error: "Message not found or is not shareable" });
    }

    let messagePair: any[] = [];
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
      messages: messagePair.map((msg: any) => ({
        text: extractUserMessageContent(msg.content),
        type: msg.role === 'user' ? 'user' : 'agent',
        timestamp: new Date(conversation.timestamp || Date.now()).toISOString(),
        conversationId: conversation.conversationId,
        messageId: msg.id,
        referenceSources: msg.referenceSources,
      })),
      conversationId: conversation.conversationId,
    };

    console.log("Single message pair shareData for messageId", messageId, shareData);
    res.json(shareData);
  } catch (error) {
    console.error("Error fetching shared message pair:", error);
    res.status(500).json({ error: "Failed to fetch shared message pair" });
  }
}) as RequestHandler);


const PORT = process.env.REST_API_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
