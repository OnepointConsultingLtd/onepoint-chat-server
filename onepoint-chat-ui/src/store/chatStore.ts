import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchRelatedTopics } from '../lib/apiClient';
import { INITIAL_MESSAGE, LOCAL_STORAGE_KEYS } from '../lib/constants';
import { clearChatData } from '../lib/persistence';
import { ChatStore, TopicActionPayload } from '../type/chatStore';
import { Message, Question, Topic, Topics } from '../type/types';
import { exportChatToPDFApi } from '../utils/exportChat';

function newChat() {
  return {
    messages: [],
    isThinking: false,
    isRestarting: false,
    isSidebarOpen: false,
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
    editingMessageId: null,
    editHandler: null,
    topicQuestions: [],
    topicQuestionsLoading: false,
    topicQuestionsError: null,
    isFloatingOpen: false,
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
      editingMessageId: null,
      editHandler: null,
      topicQuestions: [],
      topicQuestionsLoading: false,
      topicQuestionsError: null,
      isSelectedTopicFromTopic: false,
      isFloatingOpen: true,

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
      setLastMessage: (message: Message | null) => set(() => ({ lastMessage: message })),
      setCurrentMessage: (message: Message | null) => set(() => ({ currentMessage: message })),
      setHandleSubmit: (cb: (text: string) => void) => set(() => ({ handleSubmitCallback: cb })),
      setIsStreaming: (value: boolean) => set({ isStreaming: value }),
      setEditingMessageId: (id: string | null) => set({ editingMessageId: id }),
      setEditHandler: (handler: (messageId: string, newText: string) => void) => set({ editHandler: handler }),
      setTopicQuestions: (questions: Question[]) => set({ topicQuestions: questions }),
      setTopicQuestionsLoading: (loading: boolean) => set({ topicQuestionsLoading: loading }),
      setTopicQuestionsError: (error: string | null) => set({ topicQuestionsError: error }),
      setIsFloatingOpen: (open: boolean) => set({ isFloatingOpen: open }),

      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleFloatingChat: () => set(state => ({ isFloatingOpen: !state.isFloatingOpen })),

      fetchRelatedTopics: async (topicName: string, text?: string) => {
        set({ relatedTopicsLoading: true });
        try {
          const data = await fetchRelatedTopics(topicName, text || '');
          set({ relatedTopics: data, relatedTopicsLoading: false });
        } catch (error) {
          console.error('Error fetching related topics:', error);
          set({ relatedTopicsLoading: false });
        }
      },

      handleTopicAction: async (payload: TopicActionPayload) => {
        const { setSelectedTopic, fetchRelatedTopics } = get();

        const manual = payload.type === 'manual';
        const question = payload.type === 'question';
        const related = payload.type === 'related';
        if (related || manual || question) {
          setSelectedTopic({
            name: related ? payload.topic.name : manual ? payload.text : question ? payload.question.text : '',
            description: '',
            type: related ? 'related' : manual ? 'manual' : question ? 'question' : '',
            questions: [related ? payload.topic.name : manual ? payload.text : question ? payload.question.text : ''],
          });
          await fetchRelatedTopics('', related ? payload.topic.name : manual ? payload.text : question ? payload.question.text : '');
        }
      },

      handleClick: () => set({ showInput: true }),

      handleSubmit: (text: string) => {
        const { handleSubmitCallback } = get();
        if (handleSubmitCallback) handleSubmitCallback(text);
      },

      handleQuestionClick: (question: Question) => {
        get().handleTopicAction({ type: 'question', question });
      },

      handleRestart: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.OSCA_STORE);
        clearChatData();
        window.location.reload();

        set(() => ({
          ...newChat(),
        }));
      },

      exportChatToPDF: async (filename?: string) => {
        const { messages } = get();
        try {
          await exportChatToPDFApi(messages, filename);
        } catch (error) {
          console.error('Error exporting chat to PDF:', error);
          throw error;
        }
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.OSCA_STORE,
      partialize: state => ({
        isSidebarOpen: state.isSidebarOpen,
        selectedTopic: state.selectedTopic,
        relatedTopics: state.relatedTopics,
        topicQuestions: state.topicQuestions,
      }),
    }
  )
);

export default useChatStore;
