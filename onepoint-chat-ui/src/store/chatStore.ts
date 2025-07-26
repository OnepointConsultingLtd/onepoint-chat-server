import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchRelatedTopics } from '../lib/apiClient';
import { INITIAL_MESSAGE } from '../lib/constants';
import { clearChatData } from '../lib/persistence';
import { ChatStore, TopicActionPayload } from '../type/chatStore';
import { Message, Question, Topic, Topics } from '../type/types';

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
    isStreaming: false,
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
      isStreaming: false,

      // setters
      setIsInitialMessage: (message: Message, isLastCard: boolean) => {
        const isInitialMessage = message.text.includes(INITIAL_MESSAGE);
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
      setSelectedTopic: (topic: Topic) => set({ selectedTopic: topic }),
      setRelatedTopics: (topics: Topics) => set({ relatedTopics: topics }),
      setRelatedTopicsLoading: (loading: boolean) => set({ relatedTopicsLoading: loading }),
      setLastMessage: (message: Message | null) => set({ lastMessage: message }),
      setCurrentMessage: (message: Message | null) => set({ currentMessage: message }),
      setHandleSubmit: (cb: (text: string) => void) => set({ handleSubmitCallback: cb }),
      setIsStreaming: (value: boolean) => set({ isStreaming: value }),

      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),

      fetchRelatedTopics: async (topicName: string, text: string = '') => {
        if (!text.trim()) {
          // console.warn('Skipping fetchRelatedTopics because text is empty');
          return;
        }

        console.log("the text input is", text)

        set({ relatedTopicsLoading: true });
        const data = await fetchRelatedTopics(topicName, text);
        console.log("the data is", data)
        set({ relatedTopics: data, relatedTopicsLoading: false });
      },

      // Centralized topic action handler
      handleTopicAction: async (payload: TopicActionPayload) => {
        const { setSelectedTopic, fetchRelatedTopics } = get();

        if (payload.type === 'related') {
          setSelectedTopic(payload.topic);
          await fetchRelatedTopics(payload.topic.name, payload.topic.name);

        } else if (payload.type === 'manual') {
          setSelectedTopic({
            name: payload.text,
            description: '',
            type: 'manual',
            questions: [],
          });
          await fetchRelatedTopics('', payload.text);
        } else if (payload.type === 'question') {
          setSelectedTopic({
            name: payload.question.text,
            description: '',
            type: 'question',
            questions: [payload.question.text],
          });
          await fetchRelatedTopics('', payload.question.text);
        }
        set({ isSidebarOpen: false });

      },

      // actions
      handleClick: () => set({ showInput: true }),

      // Handle submit wrapper
      handleSubmit: (text: string) => {
        const { handleSubmitCallback } = get();
        if (handleSubmitCallback) handleSubmitCallback(text);
      },

      handleQuestionClick: (question: Question) => {
        get().handleTopicAction({ type: 'question', question });
      },

      handleRestart: () => {
        localStorage.removeItem('osca-store');
        clearChatData();
        window.location.reload();

        set(() => ({
          ...newChat(),
        }));
      },
    }),
    {
      name: 'osca-store',
      partialize: state => ({
        isSidebarOpen: state.isSidebarOpen,
        selectedTopic: state.selectedTopic,
        relatedTopics: state.relatedTopics,
      }),
    }
  )
);

export default useChatStore;
