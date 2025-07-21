import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Topic, Question, Topics } from '../type/types';
import { fetchRelatedTopics } from '../lib/apiClient';
import { clearChatData } from '../lib/persistence';
import { ChatStore } from '../type/chatStore';

function newChat() {
  return {
    messages: [],
    isThinking: false,
    isRestarting: false,
    isSidebarOpen: true,
    handleSubmitCallback: null,
    selectedTopic: null,
    relatedTopics: null,
    relatedTopicsLoading: false,
    lastMessage: null,
    currentMessage: null,
    error: null,
    isInitialMessage: false,
    showInput: false,
    showButton: false,
  };
}

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      error: null,
      showInput: false,
      showButton: false,
      isInitialMessage: false,
      messages: [],
      isThinking: false,
      isRestarting: false,
      isSidebarOpen: true,
      handleSubmitCallback: null,
      selectedTopic: null,
      relatedTopics: null,
      relatedTopicsLoading: false,
      lastMessage: null,
      currentMessage: null,

      // setters
      setIsInitialMessage: (message: Message, isLastCard: boolean) => {
        const isInitialMessage = message.text.includes('Welcome to Onepoint');
        set({
          isInitialMessage,
          showInput: isInitialMessage && isLastCard,
          showButton: false,
        });
      },
      setShowInput: (show: boolean) => set({ showInput: show }),
      setShowButton: (show: boolean) => set({ showButton: show }),
      setMessages: (messagesOrUpdater: Message[] | ((prev: Message[]) => Message[])) =>
        set(state => {
          const newMessages =
            typeof messagesOrUpdater === 'function'
              ? messagesOrUpdater(state.messages)
              : messagesOrUpdater;
          return {
            messages: newMessages,
            currentMessage: newMessages.at(-1) || null,
          };
        }),

      setIsThinking: (valueOrUpdater: boolean | ((prev: boolean) => boolean)) =>
        set(state => ({
          isThinking:
            typeof valueOrUpdater === 'function'
              ? (valueOrUpdater as (prev: boolean) => boolean)(state.isThinking)
              : valueOrUpdater,
        })),
      setIsRestarting: (value: boolean) => set({ isRestarting: value }),
      setIsSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
      setHandleQuestionClick: (cb: (question: Question) => void) =>
        set({ _handleQuestionClick: cb }),
      setSelectedTopic: (topic: Topic) => set({ selectedTopic: topic }),
      setRelatedTopics: (topics: Topics) => set({ relatedTopics: topics }),
      setRelatedTopicsLoading: (loading: boolean) => set({ relatedTopicsLoading: loading }),
      setLastMessage: (message: Message | null) => set({ lastMessage: message }),
      setCurrentMessage: (message: Message | null) => set({ currentMessage: message }),
      setHandleSubmit: (cb: (text: string) => void) => set({ handleSubmitCallback: cb }),

      fetchRelatedTopics: async (topicName: string) => {
        set({ relatedTopicsLoading: true });
        const data = await fetchRelatedTopics(topicName);
        set({ relatedTopics: data, relatedTopicsLoading: false });
      },

      // actions
      handleClick: () => set({ showInput: true }),

      handleSubmit: (text: string) => {
        const { handleSubmitCallback } = get();
        if (handleSubmitCallback) handleSubmitCallback(text);
      },

      handleTopicClick: (topic: Topic) => {
        const { handleSubmitCallback } = get();
        if (!handleSubmitCallback) return;
        const questionText =
          topic.questions && topic.questions.length > 0
            ? topic.questions[0]
            : `Tell me more about ${topic.name}`;
        set({ selectedTopic: topic });
        handleSubmitCallback(questionText);
      },

      handleQuestionClick: (question: Question) => {
        const { handleSubmitCallback } = get();
        if (!handleSubmitCallback) return;
        handleSubmitCallback(question.text);
      },

      handleRestart: () => {
        localStorage.removeItem('osca-store');
        clearChatData();
        window.location.reload();

        set(() => ({
          ...newChat(),
        }));
      },
      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
      _handleQuestionClick: undefined,
    }),
    {
      name: 'osca-store',
      partialize: state => ({
        messages: state.messages,
        isThinking: state.isThinking,
        isSidebarOpen: state.isSidebarOpen,
        selectedTopic: state.selectedTopic,
        relatedTopics: state.relatedTopics,
        relatedTopicsLoading: state.relatedTopicsLoading,
        lastMessage: state.messages.length > 0 ? state.messages[state.messages.length - 1] : null,
      }),
    }
  )
);

export default useChatStore;
