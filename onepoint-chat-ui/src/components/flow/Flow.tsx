import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FlowProps, nodeTypes } from '../../type/types';
import ChatInput from '../ChatInput';
import RenderReactMarkdown from '../RenderReactMarkdown';
import ThinkingIndicator from '../ThinkingIndicator';

// Vertical layout constants
const VERTICAL_SPACING = 400;
const NODE_WIDTH = 800;
const START_Y = 20;

function Flow({ messages, isThinking, handleSubmit, messagesEndRef }: FlowProps) {
  const reactFlowInstance = useReactFlow();
  const previousMessagesLengthRef = useRef<number>(0);

  // Scroll to the latest node
  const scrollToLatestNode = useCallback(() => {
    if (messages.length === 0 || !reactFlowInstance) return;

    const latestNodeId = `message-${messages[messages.length - 1].id}`;
    const nodes = reactFlowInstance.getNodes();
    const latestNode = nodes.find(node => node.id === latestNodeId);

    if (latestNode) {
      reactFlowInstance.fitView({
        nodes: [latestNode],
        padding: 0.3,
        duration: 300,
        includeHiddenNodes: false,
      });
    }
  }, [messages, reactFlowInstance]);

  // Handle submit with scrolling
  const handleSubmitWithScroll = useCallback(
    (text: string) => {
      handleSubmit(text);
      setTimeout(() => scrollToLatestNode(), 100);
    },
    [handleSubmit, scrollToLatestNode]
  );

  // Create nodes in a vertical column
  const flowNodes = useMemo(() => {
    if (messages.length === 0) return [];

    return messages.map((message, index) => {
      const isLastMessage = index === messages.length - 1;

      const isUserMessage = message.type === 'user';

      return {
        id: `message-${message.id}`,
        type: 'custom',
        data: {
          content: (
            <div
              className={`flex flex-col w-full overflow-hidden rounded-lg shadow ${
                isUserMessage ? 'border-l-4 border-blue-400 bg-blue-50' : 'border-l-4 border-green-400 bg-green-50'
              }`}
            >
              {/* Message header */}
              <div
                className={`px-4 py-2 text-sm font-medium flex justify-between items-center ${
                  isUserMessage ? 'bg-blue-50' : 'bg-green-50'
                }`}
              >
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Message content */}
              <div className="px-6 py-5 text-left bg-white">
                <RenderReactMarkdown message={message}>{message.text}</RenderReactMarkdown>
              </div>

              {/* Input field or thinking indicator */}
              {isLastMessage && !isThinking && (
                <div className="border-t border-gray-200">
                  <ChatInput handleSubmit={handleSubmitWithScroll} isThinking={isThinking} />
                </div>
              )}
              {isLastMessage && isThinking && message.type === 'user' && <ThinkingIndicator />}
            </div>
          ),
        },
        position: {
          x: 0, // Centered vertically
          y: START_Y + index * VERTICAL_SPACING,
        },
        style: {
          width: NODE_WIDTH,
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      };
    });
  }, [messages, isThinking, handleSubmitWithScroll]);

  // Create straighter vertical edges
  const flowEdges = useMemo(() => {
    if (messages.length <= 1) return [];

    return messages.slice(1).map((message, index) => ({
      id: `edge-${messages[index].id}-${message.id}`,
      source: `message-${messages[index].id}`,
      target: `message-${message.id}`,
      type: 'straight',
      animated: true,
      style: { stroke: '#cbd5e1', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 12,
        height: 12,
        color: '#cbd5e1',
      },
    }));
  }, [messages]);

  // Auto-adjust view when messages change
  useEffect(() => {
    if (messages.length > previousMessagesLengthRef.current) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.3,
          duration: 300,
        });
      }, 100);
    }

    scrollToLatestNode();
    previousMessagesLengthRef.current = messages.length;
  }, [messages.length, isThinking, scrollToLatestNode, reactFlowInstance]);

  // Simple handlers required by ReactFlow
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
        fitView
        fitViewOptions={{
          padding: 0.4, // More padding for better visibility
          minZoom: 0.4,
          maxZoom: 1.0,
        }}
        nodesDraggable={false}
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#f1f5f9" variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Flow;
