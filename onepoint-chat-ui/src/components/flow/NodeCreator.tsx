import { Node } from '@xyflow/react';
import { Message } from '../../type/types';
import MessageCard from './MessageCard';
import { CARD_GAP, CARD_WIDTH, CARD_Y_POSITION } from '../../lib/constants';
import { getConversationStartIndex } from '../../utils/messageUtils';

/**
 * Creates flow nodes from the messages
 */

export function createNodes(messages: Message[]): Node[] {
  const nodes: Node[] = [];

  if (!messages || messages.length === 0) {
    return [];
  }

  /**
   * Use the shared utility function to determine if we should skip the first message
   */
  const startIndex = getConversationStartIndex(messages);

  // Create cards for each user-agent message pair
  for (let i = startIndex; i < messages.length; i += 2) {
    const cardIndex = Math.floor((i - startIndex) / 2);
    const isLastCard = i >= messages.length - 2;

    nodes.push({
      id: `card-${cardIndex}`,
      type: 'custom',
      data: {
        content: <MessageCard userMessageIndex={i} isLastCard={isLastCard} />,
      },
      position: {
        x: cardIndex * (CARD_WIDTH + CARD_GAP),
        y: CARD_Y_POSITION,
      },
      style: { width: CARD_WIDTH },
    });
  }

  return nodes;
}
