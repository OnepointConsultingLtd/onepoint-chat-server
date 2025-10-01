import { Node } from '@xyflow/react';
import { CARD_GAP, CARD_WIDTH, CARD_Y_POSITION, TOPIC_CARD } from '../../lib/constants';
import { Message, TopicOrQuestion } from '../../type/types';
import { getConversationStartIndex } from '../../utils/messageUtils';
import MessageCard from './MessageCard';

export function createNodes(
  messages: Message[],
  isThinking: boolean,
  handleSubmit: (text: string) => void,
  topics: TopicOrQuestion[] = [],
  topicClickHandler?: (topic: TopicOrQuestion) => void,
  setCardHeight?: (id: string, height: number) => void,
  cardHeights?: { [id: string]: number }
): Node[] {
  const nodes: Node[] = [];

  if (!messages || messages.length === 0) return [];

  const startIndex = getConversationStartIndex(messages);
  const cardCount = Math.ceil((messages.length - startIndex) / 2);
  const lastCardIndex = cardCount - 1;

  // Use desktop constants
  const cardWidth = CARD_WIDTH;
  const cardGap = CARD_GAP;
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

    const position = {
      x: cardIndex * (cardWidth + cardGap),
      y: messageCardY,
    };

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
      position,
      style: { width: cardWidth },
    });
  }

  // Topic cards positioning
  if (topics.length > 0) {
    const topicCardConfig = TOPIC_CARD;
    const totalTopicHeight =
      topics.length * topicCardConfig.HEIGHT + (topics.length - 1) * topicCardConfig.Y_SPACING;

    // Desktop: Position topics to the right of the last message card
    const messageCardsStartY = messageCardY;
    const lastCardHeight = cardHeights?.[`card-${lastCardIndex}`] ?? 200;
    const messageCardsEndY = messageCardsStartY + lastCardHeight;
    const messageCardsMidY = (messageCardsStartY + messageCardsEndY) / 2;

    const lastCardX = lastCardIndex * (cardWidth + cardGap);
    const topicX = lastCardX + cardWidth + cardGap;
    const topicStartY = messageCardsMidY - totalTopicHeight / 2;

    let currentTopicY = topicStartY;

    topics.forEach((topic, index) => {
      nodes.push({
        id: `card-${lastCardIndex}-topic-${index}`,
        type: 'topic',
        data: {
          label: 'name' in topic ? topic.name : topic.label,
          topic: topic,
          onClick: topicClickHandler ? () => topicClickHandler(topic) : undefined,
        },
        position: { x: topicX, y: currentTopicY },
        draggable: false,
        style: {
          padding: 10,
          borderRadius: 12,
          fontSize: 14,
          width: topicCardConfig.WIDTH,
          textAlign: 'left',
          cursor: 'pointer',
          height: topicCardConfig.HEIGHT,
          boxSizing: 'border-box',
        },
      });
      currentTopicY += topicCardConfig.HEIGHT + topicCardConfig.Y_SPACING;
    });
  }

  return nodes;
}
