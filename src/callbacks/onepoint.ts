import { ChatMessage, ChatCallback } from '@gilf/chat-websocket-server';


export async function onepointCallback(
    chatHistory: ChatMessage[],
  ): Promise<ChatMessage[]> {
    const lastMessage = chatHistory.slice(-1)[0];
    // TODO: Call for extra context
    lastMessage.content = `${lastMessage.content}

Here is some extra information about the topic from Wikipedia which you can use to answer the user's question:

Extra context here.

Please use this information to answer the user's question and give references to the sources.
`
    return chatHistory
}
