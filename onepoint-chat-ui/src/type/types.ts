import CustomNode from "../components/flow/CustomNode";

export type Question = {
	id: number;
	text: string;
}

export type ServerMessage = {
	role: "user" | "assistant" | "operator" | "system";
	content: string;
	id?: string;
	timestamp?: Date;
}

export type Message = {
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



export type FlowProps = {
	messages: Message[];
	isThinking: boolean;
	handleSubmit: (text: string) => void;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const nodeTypes = {
	custom: CustomNode,
};


export type Topic = {
	name: string;
	description: string;
	type: string;
	questions: string[];
};

export type Topics = {
	topics: Topic[];
};
