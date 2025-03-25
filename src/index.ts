import { initChatServer, ChatCallback } from '@gilf/chat-websocket-server';
import { onepointCallback } from './callbacks/onepoint';
import { saveConversation } from './callbacks/saveConversationHistory';
import { handleClientId } from './callbacks/handleClientId';
import { ConversationCallback } from '@gilf/chat-websocket-server/dist/callback';
import './api/server'; // Import and start Express server

async function main() {
    console.log("Starting Onepoint Chat Server...");
    initChatServer([
        new ChatCallback("onepoint", onepointCallback),
        new ConversationCallback("saveConversation", saveConversation),
        new ConversationCallback("handleClientId", handleClientId)
    ]);
    console.log("Started Onepoint Chat Server...");
}

main().catch(console.error); 