import { Conversation, MessageType } from "@gilf/chat-websocket-server";

export async function handleClientId(conversation: Conversation): Promise<void> {
	console.log("Client ID from server:", conversation.clientId);

	conversation.ws.send(
		JSON.stringify({
			type: MessageType.CLIENT_ID,
			clientId: conversation.clientId,
			conversationId: conversation.id
		})
	);
} 