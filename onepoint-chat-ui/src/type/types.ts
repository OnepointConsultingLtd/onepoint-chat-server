export interface Question {
	id: number;
	text: string;
}

export interface ServerMessage {
	role: "user" | "assistant" | "operator" | "system";
	content: string;
	id?: string;
	timestamp?: Date;
}

export interface Message {
	id: string;
	text: string;
	type: "user" | "agent";
	timestamp: Date;
	conversationId?: string;
}

export type ChatContextType = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isSidebarOpen: boolean) => void;
	isFloatingOpen: boolean;
	setIsFloatingOpen: (isFloatingOpen: boolean) => void;
	handleFloatingBtn: () => void;
	toggleSidebar: () => void;
};


declare global {
	interface Window {
		oscaConfig: {
			websocketUrl: string;
			httpUrl: string;
		};
	}
}