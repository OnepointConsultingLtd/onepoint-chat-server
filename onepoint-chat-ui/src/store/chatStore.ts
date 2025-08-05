import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchRelatedTopics, fetchQuestions } from '../lib/apiClient';
import { INITIAL_MESSAGE, LOCAL_STORAGE_KEYS } from '../lib/constants';
import { clearChatData, getConversationId, saveConversationId } from '../lib/persistence';
import { ChatStore, TopicActionPayload } from '../type/chatStore';
import { Message, Question, Topic, Topics, TopicQuestionsResponse } from '../type/types';

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

      setIsSelectedTopicFromTopic: (isSelected: boolean) => {
        set({ isSelectedTopicFromTopic: isSelected });
        get().refreshQuestionsOnTopicChange();
      },


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

      fetchTopicQuestions: async () => {
        set({ topicQuestionsLoading: true, topicQuestionsError: null });
        const topicName = get().selectedTopic?.name;
        const isSelectedTopicFromTopic = get().isSelectedTopicFromTopic;

        try {
          let data: TopicQuestionsResponse;

          if (topicName && isSelectedTopicFromTopic) {
            data = await fetchQuestions([topicName]);

            const selectedQuestions: Question[] = [];
            const topicQuestion = data.topic_questions.find(tq => tq.name === topicName) || data.topic_questions[0];

            if (topicQuestion && topicQuestion.questions.length > 0) {
              const randomizedQuestions = topicQuestion.questions.sort(() => Math.random() - 0.5).slice(0, 5);

              for (let i = 0; i < randomizedQuestions.length; i++) {
                selectedQuestions.push({
                  id: i + 1,
                  text: randomizedQuestions[i],
                  label: topicQuestion.name,
                });
              }
            }

            set({ topicQuestions: selectedQuestions, topicQuestionsLoading: false });
          } else {
            data = await fetchQuestions();

            const selectedQuestions: Question[] = data.topic_questions.map((topicQuestion, index) => {
              const randomizedQuestions = topicQuestion.questions.sort(() => Math.random() - 0.5);
              const questionText = randomizedQuestions[0] || `Learn more about ${topicQuestion.name}`;
              return {
                id: index + 1,
                text: questionText,
                label: topicQuestion.name,
                isSelectedTopicFromTopic: false,
              };
            });

            set({ topicQuestions: selectedQuestions, topicQuestionsLoading: false });
          }
        } catch (error) {
          console.error('Error fetching topic questions:', error);
          set({
            topicQuestionsError: error instanceof Error ? error.message : 'Failed to fetch questions',
            topicQuestionsLoading: false
          });
        }
      },


      handleTopicAction: async (payload: TopicActionPayload) => {
        const { setSelectedTopic, fetchRelatedTopics, setIsSelectedTopicFromTopic } = get();

        if (payload.type === 'related') {
          setSelectedTopic(payload.topic);
          await fetchRelatedTopics(payload.topic.name, payload.topic.name);
          setIsSelectedTopicFromTopic(true);

        } else if (payload.type === 'manual') {
          setSelectedTopic({
            name: payload.text,
            description: '',
            type: 'manual',
            questions: [],
          });
          await fetchRelatedTopics('', payload.text);
          setIsSelectedTopicFromTopic(false);
        } else if (payload.type === 'question') {
          setSelectedTopic({
            name: payload.question.text,
            description: '',
            type: 'question',
            questions: [payload.question.text],
          });
          await fetchRelatedTopics('', payload.question.text);
          setIsSelectedTopicFromTopic(false);
        }
        set({ isSidebarOpen: false });

      },

      refreshQuestionsOnTopicChange: () => {
        set({ topicQuestions: [], topicQuestionsLoading: true });

        get().fetchTopicQuestions();
      },

      handleClick: () => set({ showInput: true }),

      handleSubmit: (text: string) => {
        const { handleSubmitCallback } = get();
        if (handleSubmitCallback) handleSubmitCallback(text);
      },

      handleQuestionClick: (question: Question) => {
        get().handleTopicAction({ type: 'question', question });
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

        const lastMessage = shareableMessages[shareableMessages.length - 1];

        let conversationId = typeof lastMessage?.conversationId === 'undefined' ? null : lastMessage?.conversationId;

        if (!conversationId) {
          conversationId = getConversationId();

          if (!conversationId) {
            console.warn('No conversationId found in messages');
            return null;
          }
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
        const targetMessage = messages.find(msg => msg.id === messageId);

        if (!targetMessage || (targetMessage.type !== 'agent' && targetMessage.type !== 'user')) {
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
          }));

          console.log('Shared chat loaded successfully!');
          return true;
        } catch (error) {
          console.error('Error loading shared chat:', error);
          return false;
        }
      },

      // Load shared thread (single message pair)
      loadSharedThreadById: async (messageId: string) => {
        try {
          const response = await fetch(`${window.oscaConfig.httpUrl}/api/chat/thread-share/${messageId}`);

          console.log('messageId is', messageId);
          if (!response.ok) {
            if (response.status === 404) {
              console.error('Thread not found:', messageId);
              return false;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const threadData = await response.json();

          if (!threadData.messages || !Array.isArray(threadData.messages)) {
            console.error('Invalid shared thread data: missing or invalid messages');
            return false;
          }

          const messages = threadData.messages.map((msg: { id: string; text: string; type: string; timestamp: string; conversationId?: string, messageId?: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));

          // Save the conversationId from the thread for context
          if (threadData.conversationId) {
            saveConversationId(threadData.conversationId);
          }

          set(() => ({
            messages: messages,
            isSidebarOpen: false,
            showInput: false,
            showButton: false,
            isInitialMessage: false,
          }));

          console.log('Shared thread loaded successfully!');
          return true;
        } catch (error) {
          console.error('Error loading shared thread:', error);
          return false;
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
    }),
    {
      name: LOCAL_STORAGE_KEYS.OSCA_STORE,
      partialize: state => ({
        // isSidebarOpen: state.isSidebarOpen,
        selectedTopic: state.selectedTopic,
        relatedTopics: state.relatedTopics,
        isSelectedTopicFromTopic: state.isSelectedTopicFromTopic,
        topicQuestions: state.topicQuestions,
      }),
    }
  )
);

export default useChatStore;
