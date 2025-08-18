// Persistence keys
enum PersistenceKeys {
  SESSION_ID = 'sessionId',
  HAS_ACTIVE_CHAT = 'activeSession',
  THREAD_ID = 'threadId',
  IS_THREAD_MODE = 'isThreadMode',
}

export function isChatActive(): boolean {
  return localStorage.getItem(PersistenceKeys.HAS_ACTIVE_CHAT) === 'true';
}

export function saveConversationId(conversationId: string | null) {
  if (!conversationId) return;
  localStorage.setItem(PersistenceKeys.SESSION_ID, conversationId);
}

export function getConversationId(): string | null {
  try {
    const conversationId = localStorage.getItem(PersistenceKeys.SESSION_ID);
    if (!conversationId) return null;
    return conversationId;
  } catch (error) {
    console.warn('Error parsing conversation ID:', error);
    return null;
  }
}

export function saveThreadId(threadId: string | null) {
  if (!threadId) return;
  localStorage.setItem(PersistenceKeys.THREAD_ID, threadId);
  localStorage.setItem(PersistenceKeys.IS_THREAD_MODE, 'true');
}

export function getThreadId(): string | null {
  try {
    const threadId = localStorage.getItem(PersistenceKeys.THREAD_ID);
    if (!threadId) return null;
    return threadId;
  } catch (error) {
    console.warn('Error parsing thread ID:', error);
    return null;
  }
}

export function isThreadMode(): boolean {
  return localStorage.getItem(PersistenceKeys.IS_THREAD_MODE) === 'true';
}

export function clearThreadData() {
  localStorage.removeItem(PersistenceKeys.THREAD_ID);
  localStorage.removeItem(PersistenceKeys.IS_THREAD_MODE);
}

export function markChatAsActive() {
  if (!isChatActive()) {
    localStorage.setItem(PersistenceKeys.HAS_ACTIVE_CHAT, 'true');
  }
}

export function clearChatData() {
  localStorage.removeItem(PersistenceKeys.SESSION_ID);
  localStorage.removeItem(PersistenceKeys.HAS_ACTIVE_CHAT);
  clearThreadData();
}
