import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchRelatedQuestions as fetchQuestionsFromApi, fetchRelatedTopics } from '../lib/apiClient';
import { INITIAL_MESSAGE, LOCAL_STORAGE_KEYS } from '../lib/constants';
import { clearChatData, getConversationId, saveConversationId, saveThreadId, clearThreadData } from '../lib/persistence';
import { ChatStore, TopicActionPayload } from '../type/chatStore';
import { Message, Question, Topic, TopicQuestionsResponse, Topics } from '../type/types';
import { SharedResponse } from '..';
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
    isThreadShareMode: false,
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
      isThreadShareMode: false,

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
      setIsThreadShareMode: (isThreadMode: boolean) => set({ isThreadShareMode: isThreadMode }),

      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),

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

      fetchRelatedQuestions: async (topicName: string = '', text: string = '') => {
        set({ topicQuestionsLoading: true, topicQuestionsError: null });
        try {
          const isContextualSearch = !!topicName || !!text;
          const topics = topicName ? [topicName] : [];
          const data: TopicQuestionsResponse = await fetchQuestionsFromApi(topics, text);
          let finalData = data;

          console.log("the data", data)

          if (isContextualSearch && (!data.topic_questions || data.topic_questions.length === 0)) {
            finalData = await fetchQuestionsFromApi([], '');
          }

          const newQuestions: Question[] = [];

          if (finalData.topic_questions && finalData.topic_questions.length > 0) {
            if (isContextualSearch && finalData === data) {
              const mainTopic = finalData.topic_questions[0];
              if (mainTopic.questions.length > 0) {
                const randomizedQuestions = mainTopic.questions.sort(() => 0.5 - Math.random()).slice(0, 5);
                randomizedQuestions.forEach((qText, index) => {
                  newQuestions.push({
                    id: index + 1,
                    text: qText,
                    label: mainTopic.name,
                  });
                });
              }
            } else {
              const generalQuestin = finalData.topic_questions.slice(0, 5);
              generalQuestin.forEach((topicQuestion, index) => {
                if (topicQuestion.questions.length > 0) {
                  const questionText = topicQuestion.questions.sort(() => 0.5 - Math.random())[0];
                  newQuestions.push({
                    id: index + 1,
                    text: questionText,
                    label: topicQuestion.name,
                  });
                }
              });
            }
          }

          set({ topicQuestions: newQuestions, topicQuestionsLoading: false });
        } catch (error) {
          console.error('Error fetching topic questions:', error);
          set({
            topicQuestionsError: error instanceof Error ? error.message : 'Failed to fetch questions',
            topicQuestionsLoading: false,
          });
        }
      },

      handleTopicAction: async (payload: TopicActionPayload) => {
        const { setSelectedTopic, fetchRelatedTopics, fetchRelatedQuestions } = get();

        if (payload.type === 'related') {
          setSelectedTopic(payload.topic);
          await fetchRelatedTopics(payload.topic.name);
          await fetchRelatedQuestions(payload.topic.name);
        } else if (payload.type === 'manual') {
          setSelectedTopic({
            name: payload.text,
            description: '',
            type: 'manual',
            questions: [],
          });
          await fetchRelatedTopics('', payload.text);
          await fetchRelatedQuestions('', payload.text);
        } else if (payload.type === 'question') {
          setSelectedTopic({
            name: payload.question.text,
            description: '',
            type: 'question',
            questions: [payload.question.text],
          });
          await fetchRelatedTopics('', payload.question.text);
        }
      },

      refreshQuestions: () => {
        const { selectedTopic, fetchRelatedQuestions } = get();

        if (selectedTopic) {
          if (selectedTopic.type === 'manual' || selectedTopic.type === 'question') {
            fetchRelatedQuestions('', selectedTopic.name);
          } else {
            fetchRelatedQuestions(selectedTopic.name);
          }
        } else {
          fetchRelatedQuestions();
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

      exitThreadShareMode: () => {
        clearThreadData();

        const url = new URL(window.location.href);
        url.searchParams.delete('threadId');
        window.history.replaceState({}, document.title, url.pathname + url.search);

        window.location.reload();

        set(() => ({
          ...newChat(),
        }));
      },

      // Share functionality
      generateShareableId: () => {
        const { messages } = get();

        if (!messages || messages.length === 0) {
          return null;
        }

        const shareableMessages = messages.filter(msg =>
          msg.type === 'user' || msg.type === 'agent'
        );

        if (shareableMessages.length === 0) {
          return null;
        }

        const conversationId = getConversationId();
        if (!conversationId) {
          console.warn('No conversationId found in messages');
          return null;
        }

        const currentUrl = window.location.origin + window.location.pathname;
        const shareableUrl = `${currentUrl}?id=${conversationId}`;
        return shareableUrl;
      },

      // Thread share functionality (single message pair)
      generateThreadShareableId: (messageId: string) => {
        const { messages } = get();

        if (!messages || messages.length === 0) {
          return null;
        }

        // Find the message with the given messageId
        const targetMessage = messages.find(msg => msg.id || msg.messageId === messageId);

        if (!targetMessage || targetMessage.type !== 'agent') {
          console.warn('Message not found or not a user/agent message');
          return null;
        }

        const currentUrl = window.location.origin + window.location.pathname;
        const shareableUrl = `${currentUrl}?threadId=${messageId}`;
        return shareableUrl;
      },

      loadSharedChatById: async (conversationId: string) => {
        try {
          saveConversationId(conversationId);
          const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/share/${conversationId}`);

          if (!response.ok) {
            if (response.status === 404) {
              console.error('Conversation not found:', conversationId);
              return false;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const chatData = await response.json();

          if (!chatData.messages || !Array.isArray(chatData.messages)) {
            console.error('Invalid shared chat data: missing or invalid messages');
            return false;
          }

          const messages = chatData.messages.map((msg: { id: string; text: string; type: string; timestamp: string; conversationId?: string; messageId?: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));

          set(() => ({
            messages: messages,
            isSidebarOpen: false,
            showInput: false,
            showButton: false,
            isInitialMessage: false,
            isThreadShareMode: false,
          }));

          console.log('Shared chat loaded successfully!');
          return true;
        } catch (error) {
          console.error('Error loading shared chat:', error);
          return false;
        }
      },

      // Load shared thread (single message pair)
      loadSharedThreadById: async (messageId: string): Promise<SharedResponse> => {
        try {
          const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/thread-share/${messageId}`);

          if (!response.ok) {
            if (response.status === 404) {
              console.error('Thread not found:', messageId);
              return {
                status: false,
                error: 'Thread not found',
                messages: [],
              };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const threadData = await response.json();


          if (!threadData.messages || !Array.isArray(threadData.messages)) {
            console.error('Invalid shared thread data: missing or invalid messages');
            return {
              status: false,
              error: 'Invalid shared thread data: missing or invalid messages',
              messages: [],
            };
          }

          const messages = threadData.messages.map((msg: {
            id: string;
            text: string;
            type: string;
            timestamp: string;
            messageId: string;
          }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          // saveConversationId(messages?.conversationId);

          saveThreadId(messageId);

          set(() => ({
            messages: messages,
            isSidebarOpen: false,
            isThreadShareMode: true,
            selectedTopic: null,
            relatedTopics: null,
            relatedTopicsLoading: false,
            topicQuestions: [],
            topicQuestionsLoading: false,
            topicQuestionsError: null,
          }));

          console.log('Shared thread loaded successfully!');
          return {
            status: true,
            messages: messages,
          };
        } catch (error) {
          console.error('Error loading shared thread:', error);
          return {
            status: false,
            error: 'Failed to load shared thread',
            messages: [],
          };
        }
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
        isThreadShareMode: state.isThreadShareMode,
      }),
    }
  )
);

export default useChatStore;
