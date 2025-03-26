export interface Question {
	id: number;
	text: string;
}

export interface ServerMessage {
	role: "user" | "assistant" | "operator" | "system";
	content: string;
	id?: string;
	timestamp?: Date;
	clientId?: string;
}

export interface Message {
	id: string;
	text: string;
	type: "user" | "agent";
	timestamp: Date;
	clientId?: string;
}

export type ChatContextType = {
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	inputText: string;
	setInputText: React.Dispatch<React.SetStateAction<string>>;
	clientId: string;
	setClientId: React.Dispatch<React.SetStateAction<string>>;
	isThinking: boolean;
	setIsThinking: React.Dispatch<React.SetStateAction<boolean>>;
	isRestarting: boolean;
	setIsRestarting: React.Dispatch<React.SetStateAction<boolean>>;
	isSidebarOpen: boolean;
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isFloatingOpen: boolean;
	setIsFloatingOpen: React.Dispatch<React.SetStateAction<boolean>>;
	copiedId: string | null;
	setCopiedId: React.Dispatch<React.SetStateAction<string | null>>;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
	handleFloatingBtn: () => void;
	toggleSidebar: () => void;
};