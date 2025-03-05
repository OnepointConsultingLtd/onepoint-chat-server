import { initChatServer, ChatCallback, simpleLogger } from '@gilf/chat-websocket-server';

async function main() {
    initChatServer([new ChatCallback("simpleChat", simpleLogger)]);
}

main(); 