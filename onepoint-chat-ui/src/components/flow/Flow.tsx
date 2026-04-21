import { Background, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useOscaFlowBackgroundColors } from '../../hooks/useOscaFlowBackgroundColors';
import {
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM
} from '../../lib/constants';
import { interceptServerError } from '../../lib/interceptServerError';
import useChatStore from '../../store/chatStore';
import { nodeTypes, Topic, TopicOrQuestion } from '../../type/types';
import { filterDisplayableMessages } from '../../utils/messageFilter';
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
  const {
    messages,
    isThinking,
    isInitialMessage,
    relatedTopics,
    handleTopicAction,
  } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      isInitialMessage: state.isInitialMessage,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
    }))
  );

  const { isDark } = useDarkMode();
  const shellColors = useOscaFlowBackgroundColors();
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
      isInitialMessage,
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

  const nodes = useMemo(() => {
    const filteredMessages = filterDisplayableMessages(messages);

    return createNodes(
      filteredMessages,
      isThinking,
      handleSubmit,
      topicState.isInitialMessage || isThinking ? [] : topicState.relatedTopics,
      handleRelatedTopicClick as (topic: TopicOrQuestion) => void,
      setCardHeight,
      cardHeights
    );
  }, [
    messages,
    isThinking,
    topicState,
    handleSubmit,
    handleRelatedTopicClick,
    cardHeights,
    setCardHeight,
  ]);


  const filteredMessages = useMemo(() => {
    return filterDisplayableMessages(messages);
  }, [messages]);

  const edges = useMemo(() => {
    return createEdges(
      filteredMessages,
      topicState.isInitialMessage ? 0 : topicState.relatedTopics.length
    );
  }, [filteredMessages, topicState]);

  useEffect(() => {
    focusOnLatestNode(
      reactFlowInstance,
      filteredMessages,
      topicState.isInitialMessage ? 0 : topicState.relatedTopics.length
    );
    previousMessagesLengthRef.current = filteredMessages.length;
  }, [filteredMessages, isThinking, reactFlowInstance, topicState]);

  const onNodesChange = useCallback(() => { }, []);

  const onEdgesChange = useCallback(() => { }, []);

  const isError = interceptServerError(messages);

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      className="bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)] flex flex-col"
    >
      <div className="flex-1 min-h-0 relative">
        {isError ? (
          <div className="absolute inset-0 flex items-center justify-center">
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
          >
            <Background color={isDark ? shellColors.dark : shellColors.light} gap={9000} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        )}
        <div className="pointer-events-none absolute left-3 top-3 z-20">
          <div className="pointer-events-auto w-[26rem] rounded-xl border border-[color:var(--osca-border-light)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_92%,transparent)] p-2 shadow-[0_8px_30px_color-mix(in_srgb,var(--osca-accent)_14%,transparent)] backdrop-blur-md dark:border-[color:var(--osca-border-dark)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_86%,transparent)] dark:shadow-[0_8px_30px_color-mix(in_srgb,var(--osca-accent)_18%,transparent)]">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--osca-text-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search conversation..."
                className="h-10 w-full rounded-lg border border-[color:var(--osca-border-light)] bg-[color:var(--osca-bg-light)] pl-9 pr-3 text-sm text-[color:var(--osca-surface-dark)] placeholder:text-[color:var(--osca-text-muted)] outline-none transition focus:border-[color:var(--osca-accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--osca-accent)_28%,transparent)] dark:border-[color:var(--osca-border-dark)] dark:bg-[color:var(--osca-bg-dark)] dark:text-[color:var(--osca-text-on-dark)]"
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
