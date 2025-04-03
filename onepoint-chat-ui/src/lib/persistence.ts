// Persistence keys
enum PersistenceKeys {
	SESSION_ID = "sessionId",
	HAS_ACTIVE_CHAT = "activeSession"
}

// Check if chat is already active
export function isChatActive(): boolean {
	return localStorage.getItem(PersistenceKeys.HAS_ACTIVE_CHAT) === "true";
}

// Save the conversation ID only when user has actually started a chat
export function saveConversationId(conversationId: string | null) {
	if (!conversationId) return;
	localStorage.setItem(PersistenceKeys.SESSION_ID, JSON.stringify(conversationId));
}

// When the user starts a chat, we need to mark it as active
export function markChatAsActive() {
	if (!isChatActive()) {
		localStorage.setItem(PersistenceKeys.HAS_ACTIVE_CHAT, "true");
	}
}

// Get the conversation ID history
export function getConversationIdHistory(): string | null {
	debugger
	try {
		const history = localStorage.getItem(PersistenceKeys.SESSION_ID);
		if (!history) return null;
		return JSON.parse(history);
	} catch (error) {
		console.warn("Error parsing conversation ID history:", error);
		return null;
	}
}

// Get the last conversation ID only if there was an actual chat
export function getTheLastConversationId(): string | null {
	const conversationId = getConversationIdHistory();
	return conversationId;
}

// Clear all chat-related data from local storage
export function clearChatData() {
	localStorage.removeItem(PersistenceKeys.SESSION_ID);
	localStorage.removeItem(PersistenceKeys.HAS_ACTIVE_CHAT);
}
