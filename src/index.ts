import { ChatCallback, initChatServer } from "@gilf/chat-websocket-server";
import { ConversationCallback } from "@gilf/chat-websocket-server/dist/callback";
import "./api/server";
import { onepointCallback } from "./callbacks/onepoint";
import { saveConversation } from "./callbacks/saveConversationHistory";
import "./logger";

async function main() {
  console.log("Starting Onepoint Chat Server...");
  initChatServer([
    new ChatCallback("onepoint", onepointCallback, true),
    new ConversationCallback("saveConversation", saveConversation, false),
    // new ConversationCallback("handleClientId", handleClientId, false)
  ]);
  console.log("Started Onepoint Chat Server...");
}

main().catch(console.error);
