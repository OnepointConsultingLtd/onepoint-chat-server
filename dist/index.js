"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_websocket_server_1 = require("@gilf/chat-websocket-server");
async function main() {
    (0, chat_websocket_server_1.initChatServer)([new chat_websocket_server_1.ChatCallback("simpleChat", chat_websocket_server_1.simpleLogger)]);
}
main();
