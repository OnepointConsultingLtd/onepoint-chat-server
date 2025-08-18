import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useChat } from '../hooks/useChat';
import useChatStore from '../store/chatStore';
import Header from './Header';
import Sidebar from './Sidebar';
import Flow from './flow/Flow';

export default function ChatContainer() {
  const { messagesEndRef, handleSubmit, sendMessageToServer } = useChat();
  const { setHandleSubmit } = useChatStore(
    useShallow(state => ({
      setHandleSubmit: state.setHandleSubmit,
    }))
  );

  useEffect(() => {
    setHandleSubmit(handleSubmit);
  }, [handleSubmit, setHandleSubmit]);

  return (
    <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sendMessageToServer={sendMessageToServer} />
      <div className="flex flex-col flex-1 bg-white dark:bg-gray-800">
        <Header />
        <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
          <Flow
            messagesEndRef={messagesEndRef}
            handleSubmit={handleSubmit}
            sendMessageToServer={sendMessageToServer}
          />
        </div>
      </div>
    </main>
  );
}
