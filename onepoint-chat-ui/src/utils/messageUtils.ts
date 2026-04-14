import { Message } from '../type/types';

function displayable(messages: Message[]): Message[] {
  return messages.filter(m => !m.text.includes('Connection closed'));
}

/** True while the user has not sent a message after the tenant welcome bubble. */
export function isConversationInWelcomePhase(messages: Message[]): boolean {
  const filtered = displayable(messages);
  if (filtered.length === 0) return false;

  const welcomeIdx = filtered.findIndex(m => m.isWelcome === true);
  if (welcomeIdx >= 0) {
    return !filtered.slice(welcomeIdx + 1).some(m => m.type === 'user');
  }

  // Legacy: only one assistant message (welcome) before any user turn
  if (filtered.length === 1 && filtered[0].type === 'agent') {
    return true;
  }

  return false;
}

export function getConversationStartIndex(messages: Message[]): number {
  if (!messages?.length) return 0;
  const first = messages[0];
  if (first?.type !== 'agent') return 0;
  if (first.isWelcome === true) return 1;
  if (messages.length === 1) return 1;
  return 0;
}

/** React Flow message cards: includes the synthetic welcome-only card when pairing yields none. */
export function getMessageFlowCardCount(messages: Message[]): number {
  if (!messages?.length) return 0;
  const startIndex = getConversationStartIndex(messages);
  const remainder = messages.length - startIndex;
  if (startIndex >= 1 && remainder === 0 && messages[0]?.type === 'agent') {
    return 1;
  }
  return Math.ceil(remainder / 2);
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
