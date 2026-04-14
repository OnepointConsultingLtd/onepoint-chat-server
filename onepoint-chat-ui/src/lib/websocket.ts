import WebSocket from 'isomorphic-ws';

export function createWebSocket(userId?: string | null, anonymousId?: string | null): WebSocket {
  const { websocketUrl, clientToken } = window.oscaConfig;
  if (!websocketUrl || !clientToken) {
    throw new Error('[Osca] websocketUrl and clientToken are required — call resolveOscaConfig() first');
  }
  const url = new URL(websocketUrl);
  url.searchParams.set('token', clientToken);
  if (userId) url.searchParams.set('userId', userId);
  if (anonymousId) url.searchParams.set('anonymousId', anonymousId);
  return new WebSocket(url.toString());
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
