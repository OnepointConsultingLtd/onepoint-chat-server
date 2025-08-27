import WebSocket from 'isomorphic-ws';

export function createWebSocket(): WebSocket {
  return new WebSocket(`${window.oscaConfig.websocketUrl}`);
}

export function sendMessage(
  socket: WebSocket | null,
  event: string,
  message: string | object,
  conversationId: string
) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    if (typeof message === 'string') {
      socket.send(JSON.stringify({ type: event, content: message, conversationId }));
    } else {
      socket.send(JSON.stringify({ type: event, ...message, conversationId }));
    }
    console.info(`Sent ${event} ${message}!`);
  } else {
    console.warn(`Socket is not ready, cannot send ${event} message.`);
  }
}

export function sendPing(socket: WebSocket | null, conversationId: string = '') {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'ping', content: 'keep-alive', conversationId }));
    console.info(`[PING] Sent keep-alive ping at ${new Date().toISOString()}`);
  } else {
    console.warn('[PING] Socket is not ready, cannot send ping message.');
  }
}
