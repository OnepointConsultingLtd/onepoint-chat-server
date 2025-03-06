"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_websocket_server_1 = require("@gilf/chat-websocket-server");
const onepoint_1 = require("./callbacks/onepoint");
async function main() {
    console.log("Starting Onepoint Chat Server...");
    (0, chat_websocket_server_1.initChatServer)([new chat_websocket_server_1.ChatCallback("onepoint", onepoint_1.onepointCallback)]);
}
main();
