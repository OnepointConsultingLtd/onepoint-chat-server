import { Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDarkMode } from '../../hooks/useDarkMode';
import { DEFAULT_ZOOM, INITIAL_MESSAGE, MAX_ZOOM, MIN_ZOOM } from '../../lib/constants';
import { predefinedTopics } from '../../lib/predefinedTopics';
import useChatStore from '../../store/chatStore';
import { nodeTypes, Topic } from '../../type/types';
import { createEdges } from './EdgeCreator';
import ErrorCard from './ErrorCard';
import { createNodes } from './NodeCreator';
import { focusOnLatestNode } from './ViewportManager';
import { interceptServerError } from '../../lib/interceptServerError';

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
  const {
    messages,
    isThinking,
    isInitialMessage,
    relatedTopics,
    handleTopicAction,
    isThreadShareMode,
  } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      isInitialMessage: state.isInitialMessage,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
      isThreadShareMode: state.isThreadShareMode,
    }))
  );

  const { isDark } = useDarkMode();
  const reactFlowInstance = useReactFlow();
  const previousMessagesLengthRef = useRef<number>(0);

  // Use desktop zoom settings
  const zoomSettings = useMemo(
    () => ({
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      defaultZoom: DEFAULT_ZOOM,
    }),
    []
  );

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
      isInitialMessage: isInitialMessage && !isThreadShareMode,
      isThreadShareMode,
      predefinedTopics: predefinedTopics,
      relatedTopics: relatedTopics?.topics || [],
      handleRelatedTopicClick,
    }),
    [isInitialMessage, isThreadShareMode, relatedTopics, handleRelatedTopicClick]
  );

  const [cardHeights, setCardHeights] = useState<{ [id: string]: number }>({});
  const setCardHeight = useCallback((id: string, height: number) => {
    setCardHeights(prev => {
      if (prev[id] === height) return prev;
      return { ...prev, [id]: height };
    });
  }, []);

  const nodes = useMemo(() => {
    // Filter out initial message when in thread share mode
    const filteredMessages = isThreadShareMode
      ? messages.filter(message => !message.text.includes(INITIAL_MESSAGE))
      : messages;

    return createNodes(
      filteredMessages,
      isThinking,
      handleSubmit,
      // Don't show any topics when in thread share mode
      isThreadShareMode
        ? []
        : topicState.isInitialMessage
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
    );
  }, [
    messages,
    isThinking,
    isThreadShareMode,
    topicState,
    handleSubmit,
    handleRelatedTopicClick,
    cardHeights,
    setCardHeight,
  ]);

  const filteredMessages = useMemo(() => {
    return isThreadShareMode
      ? messages.filter(message => !message.text.includes(INITIAL_MESSAGE))
      : messages;
  }, [messages, isThreadShareMode]);

  const edges = useMemo(() => {
    return createEdges(
      filteredMessages,
      isThreadShareMode
        ? 0
        : topicState.isInitialMessage
          ? predefinedTopics.length
          : topicState.relatedTopics.length
    );
  }, [filteredMessages, topicState, isThreadShareMode]);

  useEffect(() => {
    focusOnLatestNode(
      reactFlowInstance,
      filteredMessages,
      isThreadShareMode
        ? 0
        : topicState.isInitialMessage
          ? predefinedTopics.length
          : topicState.relatedTopics.length
    );
    previousMessagesLengthRef.current = filteredMessages.length;
  }, [filteredMessages, isThinking, reactFlowInstance, topicState, isThreadShareMode]);

  const onNodesChange = useCallback(() => {}, []);

  const onEdgesChange = useCallback(() => {}, []);

  const isError = interceptServerError(messages);

  return (
    <div style={{ height: '100%', width: '100%' }} className="bg-gray-50 dark:bg-gray-900">
      {isError ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <ErrorCard
            title="Connection Error"
            message="We were unable to connect to the server. Please check your internet connection or try again later."
          />
        </div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          minZoom={zoomSettings.minZoom}
          maxZoom={zoomSettings.maxZoom}
          defaultViewport={{ x: 0, y: 0, zoom: zoomSettings.defaultZoom }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            color={isDark ? '#374151' : '#f1f5f9'}
            variant={BackgroundVariant.Dots}
            gap={9000}
            size={1}
          />

          <Controls showInteractive={false} />
        </ReactFlow>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
