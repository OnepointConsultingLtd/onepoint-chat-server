import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import useChatStore from './store/chatStore';

export default function Home() {
  const { loadSharedChat } = useChatStore(
    useShallow(state => ({
      loadSharedChat: state.loadSharedChat,
    }))
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('shared');

    if (sharedData) {
      console.log('Loading shared chat..');
      const success = loadSharedChat(sharedData);

      if (success) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        console.log('Shared chat loaded successfully');
      } else {
        console.error('Failed to load shared chat');
      }
    }
  }, [loadSharedChat]);

  return (
    <ReactFlowProvider>
      <ChatContainer />
    </ReactFlowProvider>
  );
}
