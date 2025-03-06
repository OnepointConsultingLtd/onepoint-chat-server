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

  console.log("lastMessage", lastMessage);

  // Create a structured response using the knowledge base
  const response = `Based on the available information about OnePoint, here's what I can tell you:

${knowledgeBase.services}

I've used the following sources to provide this information:
- OnePoint's official website and services documentation
- Their partnerships and solutions information
- Their digital transformation and data management expertise

Please let me know if you need any specific details about OnePoint's services or capabilities.
Also refine the response to be more concise and to the point.
`;

  // Create a new message with the structured response
  const newMessage: ChatMessage = {
    role: 'onepoint',
    content: response
  };

  console.log("newMessage", newMessage);
  // Return the updated chat history with the new message
  return [...chatHistory, newMessage];
}
