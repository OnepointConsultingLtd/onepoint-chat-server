import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import useChatStore from './store/chatStore';

export default function Home() {
  const { loadSharedChatById } = useChatStore(
    useShallow(state => ({
      loadSharedChatById: state.loadSharedChatById,
    }))
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = urlParams.get('id');

    if (conversationId) {
      console.log('Loading shared chat.');
      loadSharedChatById(conversationId).then(success => {
        if (success) {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          console.log('Shared chat loaded successfully');
        } else {
          console.error('Failed to load shared chat');
        }
      });
    }
  }, [loadSharedChatById]);

  return (
    <ReactFlowProvider>
      <ChatContainer />
    </ReactFlowProvider>
  );
}
