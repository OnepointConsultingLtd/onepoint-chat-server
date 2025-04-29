import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import ChatContainer from './components/ChatContainer';

export default function Home() {
  return (
    <ReactFlowProvider>
      <ChatContainer />
    </ReactFlowProvider>
  );
}
