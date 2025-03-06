import { ChatMessage, ChatCallback } from '@gilf/chat-websocket-server';
import loadKnowledgeBase from '../loadKnowledgeBase';

/**
 * Q
 */
export async function onepointCallback(
  chatHistory: ChatMessage[],
): Promise<ChatMessage[]> {
  const lastMessage = chatHistory.slice(-1)[0];
  const knowledgeBase = await loadKnowledgeBase();
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
