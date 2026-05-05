import { Background, Controls, type Node, ReactFlow, useKeyPress, useReactFlow } from '@xyflow/react';
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
import { shouldShowConnectionErrorOverlay } from '../../lib/interceptServerError';
import useChatStore from '../../store/chatStore';
import { nodeTypes, Topic, TopicOrQuestion } from '../../type/types';
import { filterDisplayableMessages } from '../../utils/messageFilter';
import { getConversationStartIndex } from '../../utils/messageUtils';
import { createEdges } from './EdgeCreator';
import ErrorCard from './ErrorCard';
import { createNodes } from './NodeCreator';
import { focusOnLatestNode } from './ViewportManager';
import { NodeSearch } from './NodeSearch';

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
    connectionLost,
  } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      isThinking: state.isThinking,
      isInitialMessage: state.isInitialMessage,
      relatedTopics: state.relatedTopics,
      handleTopicAction: state.handleTopicAction,
      connectionLost: state.connectionLost,
    }))
  );

  const { isDark } = useDarkMode();
  const shellColors = useOscaFlowBackgroundColors();
  const reactFlowInstance = useReactFlow();
  const arrowRight = useKeyPress('ArrowRight');
  const arrowLeft = useKeyPress('ArrowLeft');

  const previousMessagesLengthRef = useRef<number>(0);
  const currentNodeIndexRef = useRef(0);
  const previousCardNodesLengthRef = useRef(0);

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
  const conversationStartIndex = useMemo(
    () => getConversationStartIndex(filteredMessages),
    [filteredMessages]
  );

  const edges = useMemo(() => {
    return createEdges(
      filteredMessages,
      topicState.isInitialMessage ? 0 : topicState.relatedTopics.length
    );
  }, [filteredMessages, topicState]);

  const cardNodes = useMemo(() => {
    return nodes
      .filter(node => /^card-\d+$/.test(node.id))
      .sort((a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1]));
  }, [nodes]);

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

  const focusNode = useCallback((node: Node) => {
    reactFlowInstance.fitView({
      nodes: [{ id: node.id }],
      duration: 500,
      padding: 0.3,
      maxZoom: 1,
    });
  }, [reactFlowInstance]);

  useEffect(() => {
    if (cardNodes.length === 0) {
      currentNodeIndexRef.current = 0;
      previousCardNodesLengthRef.current = 0;
      return;
    }

    if (cardNodes.length > previousCardNodesLengthRef.current) {
      currentNodeIndexRef.current = cardNodes.length - 1;
    } else if (currentNodeIndexRef.current > cardNodes.length - 1) {
      currentNodeIndexRef.current = cardNodes.length - 1;
    }

    previousCardNodesLengthRef.current = cardNodes.length;
  }, [cardNodes]);

  useEffect(() => {
    if (!arrowRight) return;
    const tag = document.activeElement?.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (cardNodes.length === 0) return;

    currentNodeIndexRef.current = Math.min(currentNodeIndexRef.current + 1, cardNodes.length - 1);
    const nextNode = cardNodes[currentNodeIndexRef.current];
    if (!nextNode) return;
    focusNode(nextNode);
  }, [arrowRight, cardNodes, focusNode]);

  useEffect(() => {
    if (!arrowLeft) return;
    const tag = document.activeElement?.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (cardNodes.length === 0) return;

    currentNodeIndexRef.current = Math.max(currentNodeIndexRef.current - 1, 0);
    const prevNode = cardNodes[currentNodeIndexRef.current];
    if (!prevNode) return;
    focusNode(prevNode);
  }, [arrowLeft, cardNodes, focusNode]);

  const getCardTexts = useCallback((node: Node) => {
    const match = /^card-(\d+)$/.exec(node.id);
    if (!match) return null;
    const cardIndex = Number(match[1]);
    return {
      user: filteredMessages[conversationStartIndex + cardIndex * 2]?.text ?? '',
      agent: filteredMessages[conversationStartIndex + cardIndex * 2 + 1]?.text ?? '',
    };
  }, [conversationStartIndex, filteredMessages]);

  const getSearchResultLabel = useCallback((node: Node) => {
    const texts = getCardTexts(node);
    const preview = (texts?.user || texts?.agent || node.id).replace(/\s+/g, ' ').trim();
    return preview.length > 80 ? `${preview.slice(0, 80)}...` : preview;
  }, [getCardTexts]);

  const isError = shouldShowConnectionErrorOverlay(messages, connectionLost);

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      className="bg-[color:var(--osca-bg-light)] dark:!bg-[color:var(--osca-bg-dark)] flex flex-col"
    >
      <div className="flex-1 min-h-0 relative">
        {isError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <ErrorCard
              title="Unable to connect"
              message="The chat service could not be reached. Check your network, then try again."
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

        {!isInitialMessage && (
          <div
            className="flex gap-1 rounded-md bg-primary-foreground p-1 text-foreground absolute top-0 left-0"
          >
            <NodeSearch
              onSearch={(query: string) => {
                const q = query.trim().toLowerCase();
                if (!q) return [];
                return nodes.filter((node: Node) => {
                  const texts = getCardTexts(node);
                  if (!texts) return false;
                  return texts.user.toLowerCase().includes(q) || texts.agent.toLowerCase().includes(q);
                });
              }}
              getResultLabel={getSearchResultLabel}
              onSelectNode={(node: Node) => {
                focusNode(node);
              }}
            />
          </div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
