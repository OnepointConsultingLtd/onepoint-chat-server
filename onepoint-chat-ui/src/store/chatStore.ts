import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchRelatedTopics, fetchQuestions } from '../lib/apiClient';
import { INITIAL_MESSAGE } from '../lib/constants';
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
        try {
          const data: TopicQuestionsResponse = await fetchQuestions();

          // Transform the response: select one question from each topic
          const selectedQuestions: Question[] = data.topic_questions.map((topicQuestion, index) => {
            // randomize the questions
            const randomizedQuestions = topicQuestion.questions.sort(() => Math.random() - 0.5);
            const questionText = randomizedQuestions[0] || `Learn more about ${topicQuestion.name}`;
            return {
              id: index + 1,
              text: questionText,
              label: topicQuestion.name,
            };
          });

          set({ topicQuestions: selectedQuestions, topicQuestionsLoading: false });
        } catch (error) {
          console.error('Error fetching topic questions:', error);
          set({
            topicQuestionsError: error instanceof Error ? error.message : 'Failed to fetch questions',
            topicQuestionsLoading: false
          });
        }
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

      handleClick: () => set({ showInput: true }),

      handleSubmit: (text: string) => {
        const { handleSubmitCallback } = get();
        if (handleSubmitCallback) handleSubmitCallback(text);
      },

      handleQuestionClick: (question: Question) => {
        get().handleTopicAction({ type: 'question', question });
      },

      // Edit functionality
      // TODO: Implement this further.
      editMessage: (messageId: string, newText: string) => {
        const { messages, editHandler } = get();

        // Find the message to edit
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        if (messageIndex === -1) {
          return;
        }
        // Update the message text
        set(state => ({
          messages: state.messages.map((msg, index) =>
            index === messageIndex ? { ...msg, text: newText } : msg
          )
        }));

        // Remove all messages after the edited message (including the agent response)
        set(state => ({
          messages: state.messages.slice(0, messageIndex + 1)
        }));

        // Regenerate the response using the edit handler
        if (editHandler) {
          console.log('Calling editHandler with:', { messageId, newText });
          editHandler(messageId, newText);
        } else {
          console.log('No editHandler found!');
        }
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

          const messages = chatData.messages.map((msg: { id: string; text: string; type: string; timestamp: string; conversationId?: string }) => ({
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
