import { initChatServer, ChatCallback } from '@gilf/chat-websocket-server';
import { onepointCallback } from './callbacks/onepoint';
import { saveConversation } from './callbacks/saveConversationHistory';
import { ClientCallback } from '@gilf/chat-websocket-server/dist/callback';

async function main() {
    console.log("Starting Onepoint Chat Server...");
    initChatServer([
        new ChatCallback("onepoint", onepointCallback),
        new ClientCallback("saveConversation", saveConversation)
    ]);
    console.log("Started Onepoint Chat Server...");
}

main(); 