import { useUser } from '@clerk/clerk-react';
import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import Loader from './components/Loader/Loader';

export default function Home() {
  const { isLoaded } = useUser();

  if (!isLoaded) return <Loader />;

  return (
    <ReactFlowProvider>
      <ChatContainer />
    </ReactFlowProvider>
  );
}
