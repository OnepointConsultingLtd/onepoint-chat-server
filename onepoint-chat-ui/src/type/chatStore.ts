import { Message, Question, Topic, Topics } from './types';

export type ChatStore = {
  // state
  error: string | null;
  showInput: boolean;
  showButton: boolean;
  isInitialMessage: boolean;
  messages: Message[];
  isThinking: boolean;
  isRestarting: boolean;
  isSidebarOpen: boolean;
  selectedTopic: Topic | null;
  relatedTopics: Topics | null;
  relatedTopicsLoading: boolean;
  lastMessage: Message | null;
  currentMessage: Message | null;
  isStreaming: boolean;
  editingMessageId: string | null;
  editHandler: ((messageId: string, newText: string) => void) | null;
  // handlers
  handleQuestionClick: (question: Question) => void;
  handleSubmitCallback: ((text: string) => void) | null;
  handleRestart: () => void;
  toggleSidebar: () => void;

  // setters
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
  setIsStreaming: (value: boolean) => void;
  setEditingMessageId: (messageId: string | null) => void;
  setEditHandler: (cb: (messageId: string, newText: string) => void) => void;
  fetchRelatedTopics: (topicName: string, text?: string) => Promise<void>;

  setHandleSubmit: (cb: (text: string) => void) => void;
  handleSubmit: (text: string) => void;

  handleClick: () => void;

  handleTopicAction: (payload: TopicActionPayload) => Promise<void>;

  // Edit functionality
  editMessage: (messageId: string, newText: string) => void;

  // Share functionality
  generateShareableUrl: () => string | null;
  loadSharedChat: (encodedData: string) => boolean;
};


export type TopicActionPayload =
  | { type: 'related'; topic: Topic }
  | { type: 'manual'; text: string }
  | { type: 'question'; question: Question };