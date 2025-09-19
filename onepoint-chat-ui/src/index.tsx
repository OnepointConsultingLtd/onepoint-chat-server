import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import useChatStore from './store/chatStore';
import { getThreadId, isThreadMode } from './lib/persistence';
import { Message } from './type/types';

export type SharedResponse = {
  status: boolean;
  error?: string;
  messages: Message[];
  threadId?: string;
};

export default function Home() {
  const { loadSharedChatById, loadSharedThreadById } = useChatStore(
    useShallow(state => ({
      loadSharedChatById: state.loadSharedChatById,
      loadSharedThreadById: state.loadSharedThreadById,
    }))
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = urlParams.get('id');
    const threadId = urlParams.get('threadId');

    // Check for URL parameters first (fresh shared links)
    if (conversationId) {
      loadSharedChatById(conversationId).then(success => {
        if (success) {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          console.log('Shared chat loaded successfully');
        } else {
          console.error('Failed to load shared chat');
        }
      });
    } else if (threadId) {
      async function proccessSharedMessage() {
        if (!threadId) return;

        const response: SharedResponse = await loadSharedThreadById(threadId);

        if (response.status) {
          document.title = 'Onepoint Chat';
        } else {
          console.error('Failed to load shared thread');
        }
      }
      proccessSharedMessage();
    }
    // Check for persisted thread data (after refresh)
    else if (isThreadMode()) {
      const persistedThreadId = getThreadId();
      if (persistedThreadId) {
        loadSharedThreadById(persistedThreadId).then(success => {
          if (success) {
            console.log('Persisted thread restored successfully');
          } else {
            console.error('Failed to restore persisted thread');
          }
        });
      }
    }
  }, [loadSharedChatById, loadSharedThreadById]);

  return (
    <ReactFlowProvider>
      <ChatContainer />
    </ReactFlowProvider>
  );
}
