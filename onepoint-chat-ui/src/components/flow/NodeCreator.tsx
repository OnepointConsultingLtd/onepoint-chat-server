import { Node } from '@xyflow/react';
import { Message } from '../../type/types';
import MessageCard from './MessageCard';
import { CARD_GAP, CARD_WIDTH, CARD_Y_POSITION } from './constants';

/**
 * Creates flow nodes from the messages
 */

export const createNodes = (
  messages: Message[],
  isThinking: boolean,
  handleSubmit: (text: string) => void
): Node[] => {
  const nodes: Node[] = [];

  const startIndex = messages.length > 1 ? 1 : 0;

  // Create cards for each user-agent message pair
  for (let i = startIndex; i < messages.length; i += 2) {
    const userMessage = messages[i];
    const agentMessage = i + 1 < messages.length ? messages[i + 1] : null;
    const cardIndex = Math.floor(i / 2);
    const isLastCard = i >= messages.length - 2;

    nodes.push({
      id: `card-${cardIndex}`,
      type: 'custom',
      data: {
        content: (
          <MessageCard
            userMessage={userMessage}
            agentMessage={agentMessage}
            isLastCard={isLastCard}
            isThinking={isThinking}
            handleSubmit={handleSubmit}
          />
        ),
      },
      position: {
        x: cardIndex * (CARD_WIDTH + CARD_GAP),
        y: CARD_Y_POSITION,
      },
      style: { width: CARD_WIDTH },
    });
  }

  return nodes;
};
