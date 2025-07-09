import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Topics, Message, Question, ServerMessage } from "../type/types";
import { fetchTopics } from "../lib/apiClient";
import { messageFactoryUser } from "../lib/messageFactory";
import { clearChatData, markChatAsActive, saveConversationId } from "../lib/persistence";
import { fetchChatHistory, fetchRawHistory } from "../utils/fetchChatHistory";

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
  currentConversationId: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;

  // setters
  setTopics: (topics: Topics) => void;
  loadTopics: () => Promise<void>;
  setIsInitialMessage: (message: Message, isLastCard: boolean) => void;
  setShowInput: (show: boolean) => void;
  setShowButton: (show: boolean) => void;
  handleClick: () => void;

  // message management
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (text: string) => void;
  setIsThinking: (thinking: boolean) => void;
  setIsRestarting: (restarting: boolean) => void;
  setCurrentConversationId: (id: string | null) => void;
  setMessagesEndRef: (ref: React.RefObject<HTMLDivElement | null>) => void;

  // chat actions
  handleSubmit: (text: string) => void;
  handleQuestionClick: (question: Question) => void;
  handleRestart: () => void;
  loadChatHistory: (conversationId: string) => Promise<ServerMessage[]>;
  initializeChat: () => void;
  setupWebSocket: () => void;
};

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // state
      topics: null,
      error: null,
      showInput: false,
      showButton: false,
      isInitialMessage: false,
      messages: [],
      isThinking: false,
      isRestarting: false,
      currentConversationId: null,
      messagesEndRef: { current: null },

      // setters
      setTopics: (topics: Topics) => set({ topics, error: null }),
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
      setIsInitialMessage: (message: Message, isLastCard: boolean) => {
        const isInitialMessage = message.text.includes('Welcome to Onepoint');
        set({
          showInput: isInitialMessage && isLastCard,
          showButton: false,
          isInitialMessage
        });
      },
      setShowInput: (show: boolean) => set({ showInput: show }),
      setShowButton: (show: boolean) => set({ showButton: show }),
      handleClick: () => set({ showInput: true }),

      // message management
      setMessages: (messages: Message[]) => set({ messages }),
      addMessage: (message: Message) => set((state) => ({
        messages: [...state.messages, message]
      })),
      updateLastMessage: (text: string) => set((state) => {
        const newMessages = [...state.messages];
        if (newMessages.length > 0) {
          const lastMessage = { ...newMessages[newMessages.length - 1] };
          lastMessage.text += text;
          newMessages[newMessages.length - 1] = lastMessage;
        }
        return { messages: newMessages };
      }),
      setIsThinking: (thinking: boolean) => set({ isThinking: thinking }),
      setIsRestarting: (restarting: boolean) => set({ isRestarting: restarting }),
      setCurrentConversationId: (id: string | null) => set({ currentConversationId: id }),
      setMessagesEndRef: (ref: React.RefObject<HTMLDivElement | null>) => set({ messagesEndRef: ref }),

      // chat actions
      handleSubmit: (text: string) => {
        const state = get();
        if (!text.trim()) return;

        if (!state.currentConversationId) {
          // Queue message and request conversation ID
          state.setIsThinking(true);
          const userMessage = messageFactoryUser(text, "");
          state.addMessage(userMessage);
          // Note: WebSocket setup would need to be handled separately
          return;
        }

        state.setIsThinking(true);
        const userMessage = messageFactoryUser(text, state.currentConversationId);
        state.addMessage(userMessage);
        // Note: WebSocket send would need to be handled separately
      },

      handleQuestionClick: (question: Question) => {
        const state = get();
        if (!state.currentConversationId) {
          state.setIsThinking(true);
          const userMessage = messageFactoryUser(question.text, "");
          state.addMessage(userMessage);
          // Note: WebSocket setup would need to be handled separately
          return;
        }

        state.setIsThinking(true);
        const userMessage = messageFactoryUser(question.text, state.currentConversationId);
        state.addMessage(userMessage);
        // Note: WebSocket send would need to be handled separately
      },

      handleRestart: () => {
        clearChatData();
        set({
          messages: [],
          isThinking: false,
          currentConversationId: null,
          showInput: false,
          showButton: false,
          isInitialMessage: false
        });
      },

      loadChatHistory: async (conversationId: string) => {
        const rawHistory = await fetchRawHistory(conversationId);
        const formattedMessages = await fetchChatHistory(conversationId, rawHistory);
        if (formattedMessages && formattedMessages.length > 0) {
          set({ messages: formattedMessages, currentConversationId: conversationId });
          markChatAsActive();
        }
        return rawHistory;
      },

      initializeChat: () => {
        const state = get();
        if (state.currentConversationId) {
          markChatAsActive();
          saveConversationId(state.currentConversationId);
        }
      },

      setupWebSocket: () => {
        // This would need to be implemented with the WebSocket logic
        // For now, we'll leave this as a placeholder
        console.log("WebSocket setup would be implemented here");
      },
    }),
    {
      name: "chat-store",
      partialize: (state) => ({
        topics: state.topics,
        messages: state.messages,
        currentConversationId: state.currentConversationId,
      }),
    }
  )
);

export default useChatStore;
