import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Topics, Message, Topic } from "../type/types";
import { fetchTopics } from "../lib/apiClient";

type ChatStore = {
	// state
	topics: Topics | null;
	error: string | null;
	showInput: boolean;
	showButton: boolean;
	isInitialMessage: boolean;
	messages: Message[];
	isThinking: boolean;
	isRestarting: boolean;
	// handlers
	handleSubmitCallback: ((text: string) => void) | null;

	// setters
	setTopics: (topics: Topics) => void;
	loadTopics: () => Promise<void>;
	setIsInitialMessage: (message: Message, isLastCard: boolean) => void;
	setShowInput: (show: boolean) => void;
	setShowButton: (show: boolean) => void;
	setMessages: (messagesOrUpdater: Message[] | ((prev: Message[]) => Message[])) => void;
	setIsThinking: (valueOrUpdater: boolean | ((prev: boolean) => boolean)) => void;
	setIsRestarting: (value: boolean) => void;
	setHandleSubmit: (cb: (text: string) => void) => void;

	// actions
	handleClick: () => void;
	handleTopicClick: (topic: Topic) => void;
	handleSubmit: (text: string) => void;
};

const useChatStore = create<ChatStore>()(
	persist(
		(set, get) => ({
			topics: null,
			error: null,
			showInput: false,
			showButton: false,
			isInitialMessage: false,
			messages: [],
			isThinking: false,
			isRestarting: false,
			handleSubmitCallback: null,

			// handle data
			loadTopics: async () => {
				set({ error: null });
				try {
					const topics = await fetchTopics();
					set({ topics, error: null });
				} catch (error) {
					console.error('Failed to fetch topics:', error);
					set({
						error: error instanceof Error ? error.message : 'Failed to fetch topics'
					});
				}
			},

			// setters
			setTopics: (topics: Topics) => set({ topics, error: null }),
			setIsInitialMessage: (message: Message, isLastCard: boolean) => {
				const isInitialMessage = message.text.includes('Welcome to Onepoint');
				set({
					showInput: isInitialMessage && isLastCard,
					showButton: false
				});
			},


			setShowInput: (show: boolean) => set({ showInput: show }),
			setShowButton: (show: boolean) => set({ showButton: show }),
			setMessages: (messagesOrUpdater: Message[] | ((prev: Message[]) => Message[])) =>
				set((state) => ({ messages: typeof messagesOrUpdater === 'function' ? (messagesOrUpdater as (prev: Message[]) => Message[])(state.messages) : messagesOrUpdater })),
			setIsThinking: (valueOrUpdater: boolean | ((prev: boolean) => boolean)) =>
				set((state) => ({ isThinking: typeof valueOrUpdater === 'function' ? (valueOrUpdater as (prev: boolean) => boolean)(state.isThinking) : valueOrUpdater })),
			setIsRestarting: (value: boolean) => set({ isRestarting: value }),
			setHandleSubmit: (cb: (text: string) => void) => set({ handleSubmitCallback: cb }),

			// actions
			handleClick: () => set({ showInput: true }),
			handleSubmit: (text: string) => {
				// TODO: Integrate with websocket logic or whatever is needed
				console.log('handleSubmit from store:', text);
			},

			// Topics
			handleTopicClick: (topic: Topic) => {
				const { handleSubmitCallback } = get();
				if (!handleSubmitCallback) return;
				const questionText =
					topic.questions && topic.questions.length > 0
						? topic.questions[0]
						: `Tell me more about ${topic.name}`;
				handleSubmitCallback(questionText);
			},
		}),
		{
			name: "chat-store-test1",
			partialize: (state) => ({
				topics: state.topics,
				messages: state.messages,
				isThinking: state.isThinking,
			}),
		}
	)
);

export default useChatStore;