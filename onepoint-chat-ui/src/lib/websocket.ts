import WebSocket from "isomorphic-ws";

export function createWebSocket(): WebSocket {
	return new WebSocket(`${window.oscaConfig.websocketUrl}`);
}

export function sendMessage(
	socket: WebSocket | null,
	event: string,
	message: string,
	conversationId: string,
) {
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify({ type: event, content: message, conversationId }));
		console.info(`Sent ${event} ${message}!`);
	} else {
		console.warn(`Socket is not ready, cannot send ${event} message.`);
	}
}
