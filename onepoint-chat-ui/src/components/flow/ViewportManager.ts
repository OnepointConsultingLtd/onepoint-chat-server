import { ReactFlowInstance } from '@xyflow/react';
import { Message } from '../../type/types';

/**
 * Calculates the last card ID based on the messages
 */
export const getLastCardId = (messages: Message[]): string => {
  const startIndex = messages.length > 1 ? 1 : 0;
  const cardCount = Math.ceil((messages.length - startIndex) / 2);
  return `card-${Math.max(0, cardCount - 1)}`;
};

/**
 * Focuses the viewport on the latest node
 */
export const focusOnLatestNode = (
  reactFlowInstance: ReactFlowInstance | null,
  messages: Message[]
): void => {
  if (!reactFlowInstance || messages.length === 0) return;

  const lastCardId = getLastCardId(messages);
  const nodes = reactFlowInstance.getNodes();
  const latestNode = nodes.find(node => node.id === lastCardId);

  if (latestNode) {
    reactFlowInstance.fitView({
      nodes: [latestNode],
      padding: 0.3,
      duration: 300,
      includeHiddenNodes: false,
    });
  }
};
