import { Message, Topic, Topics } from '../../type/types';
import BaseMessage from './BaseMessage';

type UserMessageProps = {
  message: Message;
  isInitialMessage?: boolean;
  topics?: Topics;
  onTopicClick?: (topic: Topic) => void;
};

export default function UserMessage({
  message,
  isInitialMessage,
  topics,
  onTopicClick,
}: UserMessageProps) {
  const header = !isInitialMessage ? (
    <div className="text-xs font-medium text-blue-600 uppercase tracking-wider">You</div>
  ) : null;

  console.log('topics', topics);

  return (
    <BaseMessage
      message={message}
      borderColor="blue-400"
      gradientFrom="blue-50"
      gradientTo="white"
      proseColor="blue"
      header={header}
      showTimestamp={!isInitialMessage}
      topics={topics}
      onTopicClick={onTopicClick}
    />
  );
}
