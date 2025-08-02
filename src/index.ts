import { ChatCallback, initChatServer } from "@gilf/chat-websocket-server";
import { ConversationCallback } from "@gilf/chat-websocket-server/dist/callback";
import "./api/server";
import { onepointCallback } from "./callbacks/onepoint";
import { saveConversation } from "./callbacks/saveConversationHistory";
import "./logger";

export const clientConversationTracker = new Map<string, string>();

function interceptWebSocketMessages() {
  const originalConsoleLog = console.log;

  // Override console.log to capture WebSocket messages
  console.log = function (...args: any[]) {
    const message = args.join(' ');

    // Look for "Received message" logs that contain conversation IDs
    if (message.includes('Received message:') && message.includes('"conversationId"')) {
      try {
        // Extract the JSON part from the log message
        const jsonStart = message.indexOf('{"type"');
        if (jsonStart !== -1) {
          const jsonStr = message.substring(jsonStart);
          const wsMessage = JSON.parse(jsonStr);

          if (wsMessage.conversationId) {
            console.log('🎯 Intercepted client conversation ID:', wsMessage.conversationId);
            setTimeout(() => {
              const timestamp = Date.now().toString();
              clientConversationTracker.set(timestamp, wsMessage.conversationId);

              if (clientConversationTracker.size > 10) {
                const oldestKey = Array.from(clientConversationTracker.keys())[0];
                clientConversationTracker.delete(oldestKey);
              }
            }, 100);
          }
        }
      } catch (error) {
        // Ignore parsing errors
      }
    }

    originalConsoleLog.apply(console, args);
  };
}

async function main() {
  console.log("Starting Onepoint Chat Server...");
  // Start message interception
  interceptWebSocketMessages();

  initChatServer([
    new ChatCallback("onepoint", onepointCallback, true),
    new ConversationCallback("saveConversation", saveConversation, false),
  ]);
  console.log("Started Onepoint Chat Server...");
}

main().catch(console.error);
