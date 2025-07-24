import { Message } from '../type/types';

/**
 * Determines if the first message in a conversation should be skipped
 */

export function getConversationStartIndex(messages: Message[]): number {
  if (!messages || messages.length <= 1) {
    return 0;
  }

  const firstIsWelcome = messages[0]?.text?.includes('Welcome to Onepoint');

  return firstIsWelcome ? 1 : 0;
}
