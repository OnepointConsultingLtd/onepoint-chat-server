import { Node } from '@xyflow/react';
import { CARD_GAP, CARD_WIDTH, CARD_Y_POSITION } from '../../lib/constants';
import { Message, Topic } from '../../type/types';
import { getConversationStartIndex } from '../../utils/messageUtils';
import MessageCard from './MessageCard';

export function createNodes(
  messages: Message[],
  isThinking: boolean,
  handleSubmit: (text: string) => void,
  topics: Topic[] = [],
  topicClickHandler?: (topic: Topic) => void,
  setCardHeight?: (id: string, height: number) => void,
  cardHeights?: { [id: string]: number }
): Node[] {
  const nodes: Node[] = [];

  if (!messages || messages.length === 0) return [];

  const startIndex = getConversationStartIndex(messages);
  const cardCount = Math.ceil((messages.length - startIndex) / 2);
  const lastCardIndex = cardCount - 1;
  const messageCardY = CARD_Y_POSITION;
  const messageCardHeights: number[] = [];

  for (let i = startIndex; i < messages.length; i += 2) {
    const userMessage = messages[i];
    const agentMessage = i + 1 < messages.length ? messages[i + 1] : null;
    const cardIndex = Math.floor((i - startIndex) / 2);
    const isLastCard = cardIndex === lastCardIndex;
    const cardId = `card-${cardIndex}`;
    const cardHeight = cardHeights?.[cardId] ?? 200;
    messageCardHeights.push(cardHeight);
    nodes.push({
      id: cardId,
      type: 'custom',
      data: {
        content: (
          <MessageCard
            userMessage={userMessage}
            agentMessage={agentMessage}
            isLastCard={isLastCard}
            isThinking={isThinking}
            handleSubmit={handleSubmit}
            onHeightChange={h => setCardHeight && setCardHeight(cardId, h)}
          />
        ),
      },
      position: {
        x: cardIndex * (CARD_WIDTH + CARD_GAP),
        y: messageCardY,
      },
      style: { width: CARD_WIDTH },
    });
  }

  const TOPIC_CARD_HEIGHT = 150;
  const TOPIC_Y_SPACING = 5;
  const TOPIC_WIDTH = 280;

  const totalTopicHeight =
    topics.length * TOPIC_CARD_HEIGHT + (topics.length - 1) * TOPIC_Y_SPACING;

  // Determine vertical center of message cards using actual heights
  const cardYs = messageCardHeights;
  const minY = messageCardY;
  const maxY = messageCardY + (cardYs.length ? Math.max(...cardYs) : 200);
  const messageCardsMidY = (minY + maxY) / 2;
  const topicBlockStartY = messageCardsMidY - totalTopicHeight / 2;

  const lastCardX = lastCardIndex * (CARD_WIDTH + CARD_GAP);
  const topicX = lastCardX + CARD_WIDTH + CARD_GAP;

  let currentY = topicBlockStartY;

  topics.forEach((topic, index) => {
    nodes.push({
      id: `card-${lastCardIndex}-topic-${index}`,
      type: 'topic',
      data: {
        label: topic.name,
        topic: topic,
        onClick: topicClickHandler ? () => topicClickHandler(topic) : undefined,
      },
      position: { x: topicX, y: currentY },
      draggable: false,
      style: {
        padding: 10,
        borderRadius: 12,
        fontSize: 14,
        width: TOPIC_WIDTH,
        textAlign: 'left',
        cursor: 'pointer',
        height: TOPIC_CARD_HEIGHT,
        boxSizing: 'border-box',
      },
    });
    currentY += TOPIC_CARD_HEIGHT + TOPIC_Y_SPACING;
  });

  return nodes;
}
