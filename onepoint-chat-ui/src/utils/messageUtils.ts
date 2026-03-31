import { Message } from '../type/types';
import { isWelcomeMessage } from './isWelcomeMessage';

export function getConversationStartIndex(messages: Message[]): number {
  if (!messages || messages.length <= 1) return 0;
  return isWelcomeMessage(messages[0]?.text) ? 1 : 0;
}

/** Same "user message" slot as `createNodes` / MessageCard for the last card (drives `setIsInitialMessage`). */
export function getLastCardUserMessage(messages: Message[]): Message | null {
  if (!messages || messages.length === 0) return null;
  const startIndex = getConversationStartIndex(messages);
  const cardCount = Math.ceil((messages.length - startIndex) / 2);
  const lastCardIndex = cardCount - 1;
  const i = startIndex + lastCardIndex * 2;
  if (i >= messages.length) return null;
  return messages[i];
}
