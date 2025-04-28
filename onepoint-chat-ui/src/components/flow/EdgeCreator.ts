import { Edge, MarkerType } from '@xyflow/react';
import { Message } from '../../type/types';

/**
 * Creates edges between conversation cards
 */
export const createEdges = (messages: Message[]): Edge[] => {
	const edges: Edge[] = [];

	// Get the actual conversation messages (skip welcome message if there are more messages)
	const startIndex = messages.length > 1 ? 1 : 0;

	// Calculate how many cards we have
	const cardCount = Math.ceil((messages.length - startIndex) / 2);

	// If we have less than 2 cards, no edges needed
	if (cardCount < 2) return edges;

	// Create edges connecting each card to the next one
	for (let i = 0; i < cardCount - 1; i++) {
		edges.push({
			id: `edge-card-${i}-to-card-${i + 1}`,
			source: `card-${i}`,
			target: `card-${i + 1}`,
			type: 'smoothstep',
			animated: true,
			style: { stroke: '#cbd5e1', strokeWidth: 2 },
			markerEnd: {
				type: MarkerType.ArrowClosed,
				width: 12,
				height: 12,
				color: '#cbd5e1',
			},
		});
	}

	return edges;
}; 