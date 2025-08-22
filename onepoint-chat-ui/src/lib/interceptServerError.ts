import { Message } from "../type/types";

export const interceptServerError = (message: Message[]) => {
	const errorMessage = message.find(msg => msg.text.includes('Connection error'));
	if (errorMessage) {
		return errorMessage;
	}
	return null;
}