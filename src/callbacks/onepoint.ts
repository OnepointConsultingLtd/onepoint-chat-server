import { ChatMessage } from '@gilf/chat-websocket-server';
import { getContext } from '../api';
import { analyzeConversation } from '../utils/conversationAnalyzer';

/**
 * Enhances OSCA's response based on conversation analysis
 */

function contextAdapter(response: any) {
  if (response.success) {
    return response.data.context_text;
  }

  return response.data;

}

export async function onepointCallback(
  chatHistory: ChatMessage[],
): Promise<ChatMessage[]> {
  const analysis = analyzeConversation(chatHistory);
  const lastMessage = chatHistory.slice(-1)[0];
  const contextResponse = await getContext(lastMessage.content);
  const knowledgeBase = contextAdapter(contextResponse);

  // Enhance the last message with context and analysisge
  lastMessage.content = `
    Context Information:
    
    ${knowledgeBase}

    Conversation Analysis:
    - Identified Persona: ${analysis.persona}
    - Relevant Services: ${analysis.services.join(', ')}
    - Initial Questions Complete: ${analysis.isInitialQuestionsComplete}

    User Message:
    ${lastMessage.content}

    Remember to:
    1. Use appropriate follow-up questions for the ${analysis.persona} persona
    2. Reference relevant case studies and services
    3. Guide toward expert connection after sufficient information gathering
`;

  return [...chatHistory];
}
