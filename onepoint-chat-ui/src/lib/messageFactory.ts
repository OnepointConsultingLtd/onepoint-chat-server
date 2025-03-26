import { v4 as uuidv4 } from "uuid";
import { Message } from "../type/types";

/**
 * Factory function to create a message for the agent
 * @param text - The text of the message
 * @returns A message object
 */

export function messageFactoryAgent(text: string): Message {
	return {
		id: uuidv4(),
		text,
		type: "agent",
		timestamp: new Date(),
	};
}

/**
 * Factory function to create a message for the user
 * @param text - The text of the message
 * @param clientId - The client ID of the user
 * @returns A message object
 */


export function messageFactoryUser(text: string, clientId: string): Message {
	return {
		id: uuidv4(),
		text,
		type: "user",
		timestamp: new Date(),
		clientId,
	};
}
