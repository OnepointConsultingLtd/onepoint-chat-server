import dotenv from "dotenv";
import { ChatCallback, initChatServer } from "@gilf/chat-websocket-server";
import { ConversationCallback } from "@gilf/chat-websocket-server/dist/callback";
import "./api/server";
import { onepointCallback } from "./callbacks/onepoint";
import { saveConversation } from "./callbacks/saveConversationHistory";
import "./logger";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Global storage for reference sources
let currentReferenceSources: any[] = [];

// Wrapper function to handle the new return type from onepointCallback
async function onepointCallbackWrapper(chatHistory: any[]) {
  const result = await onepointCallback(chatHistory);
  currentReferenceSources = result.referenceSources;
  return result.chatHistory;
}

// Wrapper for saveConversation that includes reference sources
async function saveConversationWrapper(conversation: any) {
  await saveConversation(conversation, currentReferenceSources);
  currentReferenceSources = []; // Clear after saving
}

async function main() {
  console.log("Starting Onepoint Chat Server...");
  initChatServer([
    new ChatCallback("onepoint", onepointCallbackWrapper, true),
    new ConversationCallback("saveConversation", saveConversationWrapper, false),
    // new ConversationCallback("handleClientId", handleClientId, false)
  ]);
  console.log("Started Onepoint Chat Server...");
}

main().catch(console.error);
