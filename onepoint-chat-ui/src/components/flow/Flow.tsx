import { Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../../lib/constants';
import { predefinedTopics } from '../../lib/predefinedTopics';
import useChatStore from '../../store/chatStore';
import { nodeTypes, Topic } from '../../type/types';
import { createEdges } from './EdgeCreator';
import ErrorCard from './ErrorCard';
import { createNodes } from './NodeCreator';
import { focusOnLatestNode } from './ViewportManager';

/**
 * Flow component that displays the chat conversation in a flow diagram.
 * The flow diagram is created using the ReactFlow library.
 *
 */

export default function Flow({
  messagesEndRef,
  handleSubmit,
  sendMessageToServer,
}: {
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSubmit: (text: string) => void;
  sendMessageToServer: (text: string) => void;
}) {
  const { messages, isThinking, isInitialMessage, relatedTopics, handleTopicAction } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      isInitialMessage: state.isInitialMessage,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
    }))
  );

  const reactFlowInstance = useReactFlow();
  const previousMessagesLengthRef = useRef<number>(0);

  const handleRelatedTopicClick = useCallback(
    (topic: Topic) => {
      handleTopicAction({ type: 'related', topic });
      const prompt = `Tell me more about ${topic.name}`;
      sendMessageToServer(prompt);
    },
    [handleTopicAction, sendMessageToServer]
  );

  const topicState = useMemo(
    () => ({
      isInitialMessage,
      predefinedTopics: predefinedTopics,
      relatedTopics: relatedTopics?.topics || [],
      handleRelatedTopicClick,
    }),
    [isInitialMessage, relatedTopics, handleRelatedTopicClick]
  );

  const [cardHeights, setCardHeights] = useState<{ [id: string]: number }>({});
  const setCardHeight = useCallback((id: string, height: number) => {
    setCardHeights(prev => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const nodes = useMemo(
    () =>
      createNodes(
        messages,
        isThinking,
        handleSubmit,
        topicState.isInitialMessage
          ? predefinedTopics.map((topic: Topic) => ({
              name: topic.name,
              description: topic.description,
              type: topic.type,
              questions: topic.questions,
            }))
          : !isThinking
            ? topicState.relatedTopics
            : [],
        handleRelatedTopicClick,
        setCardHeight,
        cardHeights
      ),
    [
      messages,
      isThinking,
      topicState,
      handleSubmit,
      handleRelatedTopicClick,
      cardHeights,
      setCardHeight,
    ]
  );

  const edges = useMemo(
    () =>
      createEdges(
        messages,
        topicState.isInitialMessage ? predefinedTopics.length : topicState.relatedTopics.length
      ),
    [messages, topicState]
  );

  useEffect(() => {
    focusOnLatestNode(
      reactFlowInstance,
      messages,
      topicState.isInitialMessage ? predefinedTopics.length : topicState.relatedTopics.length
    );
    previousMessagesLengthRef.current = messages.length;
  }, [messages, isThinking, reactFlowInstance, topicState]);

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
          nodes={nodes}
          edges={edges}
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
