import { Message, Question, Topic, Topics } from './types';

export interface ChatStore {
  // State
  error: string | null;
  showInput: boolean;
  showButton: boolean;
  isInitialMessage: boolean;
  messages: Message[];
  isThinking: boolean;
  isRestarting: boolean;
  isSidebarOpen: boolean;
  handleSubmitCallback: ((text: string) => void) | null;
  selectedTopic: Topic | null;
  relatedTopics: Topics | null;
  relatedTopicsLoading: boolean;
  lastMessage: Message | null;
  currentMessage: Message | null;
  isStreaming: boolean;
  editingMessageId: string | null;
  editHandler: ((messageId: string, newText: string) => void) | null;
  topicQuestions: Question[];
  topicQuestionsLoading: boolean;
  topicQuestionsError: string | null;

  // Setters
  setIsInitialMessage: (message: Message, isLastCard: boolean) => void;
  setShowInput: (show: boolean) => void;
  setShowButton: (show: boolean) => void;
  setMessages: (messagesOrUpdater: Message[] | ((prev: Message[]) => Message[])) => void;
  setIsThinking: (valueOrUpdater: boolean | ((prev: boolean) => boolean)) => void;
  setIsRestarting: (value: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
  setSelectedTopic: (topic: Topic) => void;
  setRelatedTopics: (topics: Topics) => void;
  setRelatedTopicsLoading: (loading: boolean) => void;
  setLastMessage: (message: Message | null) => void;
  setCurrentMessage: (message: Message | null) => void;
  setHandleSubmit: (cb: (text: string) => void) => void;
  setIsStreaming: (value: boolean) => void;
  setEditingMessageId: (id: string | null) => void;
  setEditHandler: (handler: (messageId: string, newText: string) => void) => void;
  setTopicQuestions: (questions: Question[]) => void;
  setTopicQuestionsLoading: (loading: boolean) => void;
  setTopicQuestionsError: (error: string | null) => void;

  // Actions
  toggleSidebar: () => void;
  fetchRelatedTopics: (topicName: string, text?: string) => Promise<void>;
  handleTopicAction: (payload: TopicActionPayload) => Promise<void>;
  handleClick: () => void;
  handleSubmit: (text: string) => void;
  handleQuestionClick: (question: Question) => void;
  editMessage: (messageId: string, newText: string) => void;
  generateShareableId: () => string | null;
  loadSharedChatById: (conversationId: string) => Promise<boolean>;
  fetchTopicQuestions: () => Promise<void>;
  handleRestart: () => void;
}


export type TopicActionPayload =
  | { type: 'related'; topic: Topic }
  | { type: 'manual'; text: string }
  | { type: 'question'; question: Question };