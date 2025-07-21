import { Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../lib/constants';
import useChatStore from '../../store/chatStore';
import { nodeTypes } from '../../type/types';
import { createEdges } from './EdgeCreator';
import ErrorCard from './ErrorCard';
import { createNodes } from './NodeCreator';
import { focusOnLatestNode } from './ViewportManager';

/**
 * Flow component that displays the chat conversation as a flowing diagram.
 */

export default function Flow({
  messagesEndRef,
  handleSubmit,
}: {
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSubmit: (text: string) => void;
}) {
  const { messages, isThinking } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
    }))
  );

  const reactFlowInstance = useReactFlow();
  const previousMessagesLengthRef = useRef<number>(0);

  // Create the nodes for the flow diagram
  const flowNodes = useMemo(
    () => createNodes(messages, isThinking, handleSubmit),
    [messages, isThinking, handleSubmit]
  );

  // Create the edges between nodes
  const flowEdges = useMemo(() => createEdges(messages), [messages]);

  // Focus on the latest node when messages or thinking state changes
  useEffect(() => {
    focusOnLatestNode(reactFlowInstance, messages);
    previousMessagesLengthRef.current = messages.length;
  }, [messages, isThinking, reactFlowInstance]);

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  const isError = messages.some(message => message.text.includes('Connection error'));

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {isError ? (
        <ErrorCard
          title="Connection Error"
          message="We were unable to connect to the server. Please check your internet connection or try again later."
        />
      ) : (
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          defaultViewport={{ x: 0, y: 0, zoom: DEFAULT_ZOOM }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#f1f5f9" variant={BackgroundVariant.Dots} gap={20} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
