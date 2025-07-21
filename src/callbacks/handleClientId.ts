import { Conversation, MessageType } from "@gilf/chat-websocket-server";

export async function handleClientId(
  conversation: Conversation,
): Promise<void> {
  conversation.ws.send(
    JSON.stringify({
      type: MessageType.CONVERSATION_ID,
      conversationId: conversation.id,
    }),
  );
}
