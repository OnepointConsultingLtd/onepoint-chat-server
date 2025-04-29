import { Edge, MarkerType } from '@xyflow/react';
import { Message } from '../../type/types';
import { getConversationStartIndex } from '../../utils/messageUtils';

/**
 * Creates edges between conversation cards
 */
export const createEdges = (messages: Message[]): Edge[] => {
	const edges: Edge[] = [];
	const startIndex = getConversationStartIndex(messages);

	// To get the number of cards we have
	const cardCount = Math.ceil((messages.length - startIndex) / 2);

	// no edges for 2 cards
	if (cardCount < 2) return edges;

	// Create edges connecting each card to the next one
	for (let i = 0; i < cardCount - 1; i++) {
		edges.push({
			id: `edge-card-${i}-to-card-${i + 1}`,
			source: `card-${i}`,
			target: `card-${i + 1}`,
			type: 'smoothstep',
			animated: true,
			style: { stroke: '#cbd5e1', strokeWidth: 1 },
			markerEnd: {
				type: MarkerType.ArrowClosed,
				orient: 'auto-start-reverse',
				width: 10,
				height: 10,
				color: '#cbd5e1',
			},
		});
	}

	return edges;
}; 