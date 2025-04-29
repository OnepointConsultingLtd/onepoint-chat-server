import { Message } from '../type/types';

/**
 * Determines if the first message in a conversation should be skipped
 */


export function getConversationStartIndex(messages: Message[]): number {
	if (!messages || messages.length <= 1) {
		return 0;
	}

	// Check if first message is a welcome/system message or from agent
	const firstIsWelcome = messages[0].text.includes('Welcome to Onepoint');

	// Skip the first message if it's a welcome message or from the agent
	return (firstIsWelcome) ? 1 : 0;
} 