import { v4 as uuidv4 } from 'uuid';
import { Message, ServerMessage } from '../type/types';

export async function fetchRawHistory(conversationId: string): Promise<ServerMessage[]> {
  try {
    const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/${conversationId}`);
    console.log("response", response);
    if (!response.ok) throw new Error('Failed to fetch chat history');
    const history: ServerMessage[] = await response.json();
    return history;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

export async function fetchChatHistory(
  conversationId: string,
  history: ServerMessage[]
): Promise<Message[]> {
  try {

    console.log("Loaded history");
    const processedHistory = history.map(msg => ({
      id: uuidv4(),
      text: msg.content,
      type:
        msg.role === 'assistant'
          ? ('agent' as const)
          : ('user' as const),
      timestamp: new Date(),
      conversationId,
    }));

    console.log("processedHistory");
    return processedHistory;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}
