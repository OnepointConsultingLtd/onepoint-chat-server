import { initChatServer, ChatCallback } from '@gilf/chat-websocket-server';
import { onepointCallback } from './callbacks/onepoint';
import { saveConversation } from './callbacks/saveConversationHistory';
import { handleClientId } from './callbacks/handleClientId';
import { ConversationCallback } from '@gilf/chat-websocket-server/dist/callback';
import './logger'
import './api/server';

async function main() {
    console.log("Starting Onepoint Chat Server...");
    initChatServer([
        new ChatCallback("onepoint", onepointCallback, true),
        new ConversationCallback("saveConversation", saveConversation, false),
        new ConversationCallback("handleClientId", handleClientId, false)
    ]);
    console.log("Started Onepoint Chat Server...");
}

main().catch(console.error); 