export interface PersonaMapping {
	keywords: string[];
	persona: string;
}

export interface ServiceMapping {
	keywords: string[];
	service: string;
}

export interface ConversationAnalysis {
	persona: string;
	services: string[];
	isInitialQuestionsComplete: boolean;
} 