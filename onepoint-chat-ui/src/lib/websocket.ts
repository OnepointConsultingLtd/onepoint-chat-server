import WebSocket from 'isomorphic-ws';

export function createWebSocket(): WebSocket {
  return new WebSocket(`${window.oscaConfig.websocketUrl}`);
}

export interface WebSocketMetadata {
  userId?: string | null;
  anonymousId?: string | null;
}

export function sendMessage(
  socket: WebSocket | null,
  event: string,
  message: string | object,
  conversationId: string,
  metadata?: WebSocketMetadata
) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    if (typeof message === 'string') {
      socket.send(JSON.stringify({ 
        type: event, 
        content: message, 
        conversationId,
        metadata: {
          userId: metadata?.userId || null,
          anonymousId: metadata?.anonymousId || null,
        }
      }));
    } else {
      socket.send(JSON.stringify({ 
        type: event, 
        ...message, 
        conversationId,
        metadata: {
          userId: metadata?.userId || null,
          anonymousId: metadata?.anonymousId || null,
        }
      }));
    }
    console.info(`Sent ${event} ${message}!`);
  } else {
    console.warn(`Socket is not ready, cannot send ${event} message.`);
  }
}
