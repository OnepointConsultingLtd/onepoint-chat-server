import { v4 as uuidv4 } from 'uuid';
import { Message, ServerMessage } from '../type/types';

export async function fetchRawHistory(conversationId: string): Promise<ServerMessage[]> {
  try {
    const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/${conversationId}`);
    if (!response.ok) throw new Error('Failed to fetch chat history');
    const history: ServerMessage[] = await response.json();
    return history;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}

export async function formatChatHistory(
  conversationId: string,
  history: ServerMessage[]
): Promise<Message[]> {
  try {

    const processedHistory = history.map(msg => {
      return {
        id: uuidv4(),
        text: msg.content,
        type:
          msg.role === 'assistant'
            ? ('agent' as const)
            : ('user' as const),
        timestamp: new Date(),
        conversationId,
        messageId: msg.id,
        referenceSources: msg.referenceSources,
      };
    });

    return processedHistory as Message[];
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
}


export type Conversation = {
  conversationId: string;
  userMessage: string;
  timestamp: string | Date;
  lastUpdated: string | Date;
  messageCount: number;
  isActive: boolean;
  chatHistory?: ServerMessage[];
};

// Endpoint: /api/conversations/user/:userId
// Description: Get all conversations for a user
export async function fetchUserConversationHistory(userId: string): Promise<Conversation[]> {
  try {
    const url = `${window.oscaConfig.httpUrl}/api/conversations/user/${userId}`;

    console.log('fetching user conversation history from', url);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch user conversations');
    const data: { conversations: Conversation[] } = await response.json();

    // Convert timestamp strings to Date objects
    return data.conversations.map(conv => ({
      ...conv,
      timestamp: conv.timestamp ? new Date(conv.timestamp) : new Date(),
      lastUpdated: conv.lastUpdated ? new Date(conv.lastUpdated) : new Date(),
    }));
  } catch (error) {
    console.error('Error fetching user conversations:', error);
    throw error;
  }
}