import { Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FlowProps, nodeTypes } from '../../type/types';
import { createEdges } from './EdgeCreator';
import { createNodes } from './NodeCreator';
import { focusOnLatestNode } from './ViewportManager';
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../lib/constants';

/**
 * Flow component that displays the chat conversation as a flowing diagram.
 */

export default function Flow({ messages, isThinking, handleSubmit, messagesEndRef }: FlowProps) {
  const reactFlowInstance = useReactFlow();
  const previousMessagesLengthRef = useRef<number>(0);

  // Create a handler that will submit the message and focus on the latest node
  const handleSubmitWithFocus = useCallback(
    (text: string) => {
      handleSubmit(text);
    },
    [handleSubmit]
  );

  // Create the nodes for the flow diagram
  const flowNodes = useMemo(
    () => createNodes(messages, isThinking, handleSubmitWithFocus),
    [messages, isThinking, handleSubmitWithFocus]
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

  return (
    <div style={{ height: '100%', width: '100%' }}>
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
      <div ref={messagesEndRef} />
    </div>
  );
}
