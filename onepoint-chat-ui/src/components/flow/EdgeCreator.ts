import { Edge, MarkerType } from '@xyflow/react';
import { Message } from '../../type/types';
import { getConversationStartIndex } from '../../utils/messageUtils';

export function createEdges(messages: Message[], topicCount: number = 0, isMobile: boolean = false): Edge[] {
  const edges: Edge[] = [];
  const startIndex = getConversationStartIndex(messages);
  const cardCount = Math.ceil((messages.length - startIndex) / 2);

  for (let i = 0; i < cardCount - 1; i++) {
    const sourceHandle = isMobile ? 'bottom' : 'right';
    const targetHandle = isMobile ? 'top' : 'left';

    edges.push({
      id: `edge-card-${i}-to-card-${i + 1}`,
      source: `card-${i}`,
      target: `card-${i + 1}`,
      sourceHandle,
      targetHandle,
      type: 'default',
      animated: true,
      style: { stroke: '#cbd5e1', strokeWidth: 1 },
      markerEnd: {
        type: MarkerType.Arrow,
        color: '#cbd5e1',
      },
    });
  }

  if (topicCount > 0) {
    const lastCardId = `card-${cardCount - 1}`;
    const sourceHandle = isMobile ? 'bottom' : 'right';
    const targetHandle = isMobile ? 'top' : 'left';

    for (let i = 0; i < topicCount; i++) {
      edges.push({
        id: `edge-${lastCardId}-to-topic-${i}`,
        source: lastCardId,
        target: `${lastCardId}-topic-${i}`,
        sourceHandle,
        targetHandle,
        type: 'default',
        animated: true,
        style: { stroke: '#3179ff', strokeWidth: 1 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3179ff',
        },
      });
    }
  }

  return edges;
}
