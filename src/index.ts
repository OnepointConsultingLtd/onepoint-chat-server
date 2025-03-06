import { initChatServer, ChatCallback } from '@gilf/chat-websocket-server';
import { onepointCallback } from './callbacks/onepoint';

async function main() {
    console.log("Starting Onepoint Chat Server...");
    initChatServer([new ChatCallback("onepoint", onepointCallback)]);
}

main(); 