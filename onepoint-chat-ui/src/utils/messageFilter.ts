import { Message } from '../type/types';

/**
 * Filters out error messages that shouldn't be displayed in the UI
 * @param messages Array of messages to filter
 * @returns Filtered array of messages
 */

export function filterDisplayableMessages(messages: Message[]): Message[] {
	return messages.filter(message => {
		if (
			message.text.includes('Connection closed') ||
			message.text.includes('Connection error')
		) {
			return false;
		}

		return true;
	});
}