import { v4 as uuidv4 } from "uuid";
import { Message, ServerMessage } from "../type/types";

export async function fetchChatHistory(clientId: string): Promise<Message[]> {
	try {
		const response = await fetch(
			`http://${window.location.hostname}:5000/api/chat/${clientId}`,
		);

		if (!response.ok) throw new Error("Failed to fetch chat history");
		const history: ServerMessage[] = await response.json();

		return history.map((msg) => ({
			id: uuidv4(),
			text: msg.content,
			type: msg.role === "assistant" ? ("agent" as const) : ("user" as const),
			timestamp: new Date(),
			clientId,
		}));
	} catch (error) {
		console.error("Error fetching chat history:", error);
		return [];
	}
}
