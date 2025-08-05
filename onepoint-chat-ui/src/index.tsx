import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import useChatStore from './store/chatStore';

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
    } else if (threadId) {
      console.log('Loading shared thread.');
      loadSharedThreadById(threadId).then(success => {
        if (success) {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          console.log('Shared thread loaded successfully');
        } else {
          console.error('Failed to load shared thread');
        }
      });
    }
  }, [loadSharedChatById, loadSharedThreadById]);

  return (
    <ReactFlowProvider>
      <ChatContainer />
    </ReactFlowProvider>
  );
}
