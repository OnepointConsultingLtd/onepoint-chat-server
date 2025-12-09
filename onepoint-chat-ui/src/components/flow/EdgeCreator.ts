import { Edge, MarkerType } from '@xyflow/react';
import { Message } from '../../type/types';
import { getConversationStartIndex } from '../../utils/messageUtils';

export function createEdges(messages: Message[], topicCount: number = 0): Edge[] {
  const edges: Edge[] = [];
  const startIndex = getConversationStartIndex(messages);
  const cardCount = Math.ceil((messages.length - startIndex) / 2);

  for (let i = 0; i < cardCount - 1; i++) {
    edges.push({
      id: `edge-card-${i}-to-card-${i + 1}`,
      source: `card-${i}`,
      target: `card-${i + 1}`,
      sourceHandle: 'right',
      targetHandle: 'left',
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

    for (let i = 0; i < topicCount; i++) {
      edges.push({
        id: `edge-${lastCardId}-to-topic-${i}`,
        source: lastCardId,
        target: `${lastCardId}-topic-${i}`,
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'default',
        animated: true,
        style: { stroke: '#808080', strokeWidth: 1 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#808080',
        },
      });
    }
  }

  return edges;
}
