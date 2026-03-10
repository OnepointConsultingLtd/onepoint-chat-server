import { Message } from '../type/types';
import { isWelcomeMessage } from './isWelcomeMessage';

export function getConversationStartIndex(messages: Message[]): number {
  if (!messages || messages.length <= 1) return 0;
  return isWelcomeMessage(messages[0]?.text) ? 1 : 0;
}
