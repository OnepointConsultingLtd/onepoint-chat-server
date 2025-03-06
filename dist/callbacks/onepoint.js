"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onepointCallback = onepointCallback;
const loadKnowledgeBase_1 = __importDefault(require("../loadKnowledgeBase"));
/**
 * Q
 */
async function onepointCallback(chatHistory) {
    const lastMessage = chatHistory.slice(-1)[0];
    const knowledgeBase = await (0, loadKnowledgeBase_1.default)();
    console.log("chatHistory ->", chatHistory);
    // Create a structured response using the knowledge base
    lastMessage.content = `This is the context information about OnePoint Consulting which you can use to answer the user's question, if it makes sense to do so:

  ${knowledgeBase["home-page"]}
  ${knowledgeBase["architect-for-outcomes"]}
  Also refine the response to be more concise and to the point.

  This is what the user said:
  ${lastMessage.content}
  `;
    // Return the updated chat history with the new message
    return [...chatHistory];
}
