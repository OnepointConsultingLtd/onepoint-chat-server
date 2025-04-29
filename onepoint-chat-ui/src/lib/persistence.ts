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
	localStorage.setItem(PersistenceKeys.SESSION_ID, conversationId);
}

// Get the conversation ID history
export function getConversationId(): string | null {
	try {
		const conversationId = localStorage.getItem(PersistenceKeys.SESSION_ID);
		if (!conversationId) return null;
		return conversationId;
	} catch (error) {
		console.warn("Error parsing conversation ID:", error);
		return null;
	}
}

// When the user starts a chat, we need to mark it as active
export function markChatAsActive() {
	if (!isChatActive()) {
		localStorage.setItem(PersistenceKeys.HAS_ACTIVE_CHAT, "true");
	}
}

// Clear all chat-related data from local storage
export function clearChatData() {
	localStorage.removeItem(PersistenceKeys.SESSION_ID);
	localStorage.removeItem(PersistenceKeys.HAS_ACTIVE_CHAT);
}