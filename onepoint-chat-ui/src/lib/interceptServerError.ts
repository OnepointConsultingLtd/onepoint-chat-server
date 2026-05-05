import { Message } from "../type/types";

const connectionErrorInMessage = (text: string) =>
	text.includes("Connection error") || text.includes("Connection closed");

export const interceptServerError = (message: Message[]) => {
	const errorMessage = message.find(msg => connectionErrorInMessage(msg.text));
	if (errorMessage) {
		return errorMessage;
	}
	return null;
};

export const shouldShowConnectionErrorOverlay = (
	messages: Message[],
	connectionLost: boolean
): boolean => Boolean(interceptServerError(messages)) || connectionLost;