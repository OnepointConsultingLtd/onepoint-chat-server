import CustomNode from '../components/flow/CustomNode';
import TopicNode from '../components/Nodes/TopicNode';

export type Question = {
  id: number;
  text: string;
  label?: string;
  isSelectedTopicFromTopic?: boolean;
};

export type ServerMessage = {
  role: 'user' | 'assistant' | 'operator' | 'system';
  content: string;
  id?: string;
  timestamp?: Date;
  hl_keywords?: string[];
  ll_keywords?: string[];
};

export type Message = {
  id: string;
  messageId: string;
  text: string;
  type: 'user' | 'agent';
  timestamp: Date;
  conversationId?: string;
  hl_keywords?: string[];
  ll_keywords?: string[];
};

export type ChatContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  isFloatingOpen: boolean;
  setIsFloatingOpen: (isFloatingOpen: boolean) => void;
  handleFloatingBtn: () => void;
  toggleSidebar: () => void;
};

declare global {
  interface Window {
    oscaConfig: {
      websocketUrl: string;
      httpUrl: string;
    };
  }
}

export type FlowProps = {
  messages: Message[];
  isThinking: boolean;
  handleSubmit: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export const nodeTypes = {
  custom: CustomNode,
  topic: TopicNode,
};

export type Topic = {
  name: string;
  description: string;
  type: string;
  questions: string[];
};

export type Topics = {
  topics: Topic[];
};


export type RelatedTopicsBody = {
  samples: number;
  path_length: number;
  restart_prob: number;
  runs: number;
  limit: number;
  source?: string;
  text?: string;
  topics_prompt?: string;
};

export type TopicQuestion = {
  name: string;
  questions: string[];
};

export type TopicQuestionsResponse = {
  topic_questions: TopicQuestion[];
};


export type ChatInputProps = {
  handleSubmit: (text: string) => void
};

