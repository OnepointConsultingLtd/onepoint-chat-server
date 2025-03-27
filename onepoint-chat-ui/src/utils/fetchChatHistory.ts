import { v4 as uuidv4 } from "uuid";
import { Message, ServerMessage } from "../type/types";

export async function fetchChatHistory(conversationId: string): Promise<Message[]> {
	try {
		const response = await fetch(
			`${window.oscaConfig.httpUrl}/api/chat/${conversationId}`,
		);

		if (!response.ok) throw new Error("Failed to fetch chat history");
		const history: ServerMessage[] = await response.json();

		return history.map((msg) => ({
			id: uuidv4(),
			text: msg.content,
			type: msg.role === "assistant" || msg.role === "operator" ? "agent" : "user",
			timestamp: new Date(),
			conversationId,
		}));
	} catch (error) {
		console.error("Error fetching chat history:", error);
		return [];
	}
}
