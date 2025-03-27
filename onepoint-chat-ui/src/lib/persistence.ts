enum PersistenceKeys {
	CONVERSATION_ID_HISTORY = "conversationIdHistory",
}

const MAX_CONVERSATION_ID_HISTORY = 10;

export function saveConversationId(conversationId: string | null) {
	if (conversationId) {
		const existingHistory = getConversationIdHistory();
		// TO remove the new ID if it already exists to prevent duplicates
		const filteredHistory = existingHistory.filter((id: string) => id !== conversationId);
		filteredHistory.push(conversationId);
		const trimmedHistory = filteredHistory.slice(-MAX_CONVERSATION_ID_HISTORY);
		localStorage.setItem(PersistenceKeys.CONVERSATION_ID_HISTORY, JSON.stringify(trimmedHistory));
	}
}

export function getConversationIdHistory() {
	const conversationIdHistory = localStorage.getItem(PersistenceKeys.CONVERSATION_ID_HISTORY);
	return JSON.parse(conversationIdHistory || "[]");
}

export function getTheLastConversationId() {
	const conversationIdHistory = getConversationIdHistory();
	if (conversationIdHistory.length === 0) {
		return null;
	}
	// TO get the last non-empty ID
	return conversationIdHistory[conversationIdHistory.length - 1];
}