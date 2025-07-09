import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Topics, Message } from "../type/types";
import { fetchTopics } from "../lib/apiClient";

type ChatStore = {
  // state
  topics: Topics | null;
  error: string | null;
  showInput: boolean;
  showButton: boolean;
  isInitialMessage: boolean;

  // setters
  setTopics: (topics: Topics) => void;
  loadTopics: () => Promise<void>;
  setIsInitialMessage: (message: Message, isLastCard: boolean) => void;
  setShowInput: (show: boolean) => void;
  setShowButton: (show: boolean) => void;
  handleClick: () => void;
};

const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      topics: null,
      error: null,
      showInput: false,
      showButton: false,
      isInitialMessage: false,
      setTopics: (topics: Topics) => set({ topics, error: null }),
      loadTopics: async () => {
        set({ error: null });
        try {
          const topics = await fetchTopics();
          set({ topics, error: null });
        } catch (error) {
          console.error('Failed to fetch topics:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch topics'
          });
        }
      },
      setIsInitialMessage: (message: Message, isLastCard: boolean) => {
        const isInitialMessage = message.text.includes('Welcome to Onepoint');
        set({
          showInput: isInitialMessage && isLastCard,
          showButton: false
        });
      },
      setShowInput: (show: boolean) => set({ showInput: show }),
      setShowButton: (show: boolean) => set({ showButton: show }),
      handleClick: () => set({ showInput: true }),
    }),
    {
      name: "chat-store",
      partialize: (state) => ({
        topics: state.topics,
      }),
    }
  )
);

export default useChatStore;
