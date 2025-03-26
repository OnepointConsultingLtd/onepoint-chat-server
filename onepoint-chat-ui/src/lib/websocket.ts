import WebSocket from "isomorphic-ws";

export function createWebSocket(): WebSocket {
	return new WebSocket(`ws://${window.location.hostname}:4000`);
}

export function sendMessage(
	socket: WebSocket | null,
	event: string,
	message: string,
	clientId: string,
) {
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify({ type: event, content: message, clientId }));
		console.info(`Sent ${event} ${message}!`);
	} else {
		console.warn(`Socket is not ready, cannot send ${event} message.`);
	}
}
