import { ReactFlowInstance } from '@xyflow/react';
import { Message } from '../../type/types';
import { getMessageFlowCardCount } from '../../utils/messageUtils';

/**
 * Calculates the last card ID based on the messages
 */
export const getLastCardId = (messages: Message[]): string => {
  const cardCount = getMessageFlowCardCount(messages);
  return `card-${Math.max(0, cardCount - 1)}`;
};

/**
 * Focuses the viewport on the latest node
 */
export const focusOnLatestNode = (
  reactFlowInstance: ReactFlowInstance | null,
  messages: Message[],
  relatedTopicsCount: number = 0
): void => {
  if (!reactFlowInstance || messages.length === 0) return;

  const lastCardId = getLastCardId(messages);
  const nodes = reactFlowInstance.getNodes();
  const latestNode = nodes.find(node => node.id === lastCardId);

  // Collect related topic nodes
  const topicNodes = [];
  for (let i = 0; i < relatedTopicsCount; i++) {
    const topicNode = nodes.find(node => node.id === `${lastCardId}-topic-${i}`);
    if (topicNode) topicNodes.push(topicNode);
  }

  const nodesToFocus = [latestNode, ...topicNodes].filter((n): n is (typeof nodes)[0] =>
    Boolean(n)
  );

  if (nodesToFocus.length > 0) {
    reactFlowInstance.fitView({
      nodes: nodesToFocus,
      padding: 0.3,
      duration: 300,
      includeHiddenNodes: false,
    });
  }
};
