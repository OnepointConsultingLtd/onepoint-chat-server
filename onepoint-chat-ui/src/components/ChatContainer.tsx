import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useChat } from '../hooks/useChat';
import { useIsMobile } from '../hooks/useIsMobile';
import useChatStore from '../store/chatStore';
import Disclaimer from './Disclaimer';
import FloatingChatMain from './FloatingChat/FloatingChatMain';
import Header from './Header';
import Sidebar from './Sidebar';
import Flow from './flow/Flow';

export default function ChatContainer() {
  const { messagesEndRef, handleSubmit, sendMessageToServer, continueConversation, deleteConversation } = useChat();
  const { isSignedIn, isLoaded } = useUser();

  const isMobile = useIsMobile();

  const { setHandleSubmit } = useChatStore(
    useShallow(state => ({
      setHandleSubmit: state.setHandleSubmit,
    }))
  );

  useEffect(() => {
    setHandleSubmit(handleSubmit);
  }, [handleSubmit, setHandleSubmit]);

  if (isMobile) {
    return (
      <>
        <FloatingChatMain
          handleSubmit={handleSubmit}
          sendMessageToServer={sendMessageToServer}
          messagesEndRef={messagesEndRef}
        />
      </>
    );
  }

  return (
    <main className="flex min-h-screen bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)]">
      {isLoaded && isSignedIn && (
        <Sidebar
          continueConversation={continueConversation}
          deleteConversation={deleteConversation}
        />
      )}
      <div className="flex flex-col flex-1 bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)]">
        <Header />
        <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
          <Flow
            messagesEndRef={messagesEndRef}
            handleSubmit={handleSubmit}
            sendMessageToServer={sendMessageToServer}
          />
        </div>
        <Disclaimer />

      </div>
    </main>
  );
}
