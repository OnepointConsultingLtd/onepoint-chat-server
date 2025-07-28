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
      editingMessageId: null,
      editHandler: null,

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
      setEditingMessageId: (id: string | null) => set({ editingMessageId: id }),
      setEditHandler: (handler: (messageId: string, newText: string) => void) => set({ editHandler: handler }),

      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),

      fetchRelatedTopics: async (topicName: string, text: string = '') => {
        if (!text.trim()) {
          return;
        }

        set({ relatedTopicsLoading: true });
        const data = await fetchRelatedTopics(topicName, text);
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

      // Edit functionality
      editMessage: (messageId: string, newText: string) => {
        const { messages, editHandler } = get();

        console.log('editMessage called with:', { messageId, newText });
        console.log('editHandler exists:', !!editHandler);

        // Find the message to edit
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        if (messageIndex === -1) {
          console.log('Message not found with id:', messageId);
          return;
        }

        console.log('Found message at index:', messageIndex);

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
      generateShareableUrl: () => {
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

        // Get the current sessionId from localStorage
        const sessionId = localStorage.getItem('sessionId');

        // Prepare data to share
        const shareData = {
          messages: shareableMessages.map(msg => ({
            id: msg.id,
            text: msg.text,
            type: msg.type,
            timestamp: msg.timestamp.toISOString(),
            conversationId: msg.conversationId
          })),
          sessionId: sessionId,
          sharedAt: new Date().toISOString()
        };

        try {
          // Encoding
          const jsonString = JSON.stringify(shareData);
          const encodedData = btoa((encodeURIComponent(jsonString)));

          // Generate the shareable URL
          const currentUrl = window.location.origin + window.location.pathname;
          const shareableUrl = `${currentUrl}?shared=${encodedData}`;

          return shareableUrl;
        } catch (error) {
          console.error('Error generating shareable URL:', error);
          return null;
        }
      },

      loadSharedChat: (encodedData: string) => {
        try {
          // Decoding  
          const decodedString = decodeURIComponent((atob(encodedData)));
          const decodedData = JSON.parse(decodedString);

          if (!decodedData.messages || !Array.isArray(decodedData.messages)) {
            console.error('Invalid shared chat data: missing or invalid messages');
            return false;
          }

          if (decodedData.sessionId) {
            localStorage.setItem('sessionId', decodedData.sessionId);
          }

          const messages = decodedData.messages.map((msg: { id: string; text: string; type: string; timestamp: string; conversationId?: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));

          set(() => ({
            messages: messages,
            isSidebarOpen: false,
            showInput: false,
            showButton: false,
            isInitialMessage: false
          }));

          console.log('Shared chat loaded successfully');
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
