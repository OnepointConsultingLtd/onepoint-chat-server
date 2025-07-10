import { Message, Topic } from '../../type/types';
import BaseMessage from './BaseMessage';
import useChatStore from '../../context/chatStore';
import { useShallow } from 'zustand/react/shallow';
type UserMessageProps = {
  message: Message;
  isInitialMessage?: boolean;
  onTopicClick?: (topic: Topic) => void;
};

export default function UserMessage({ message, isInitialMessage, onTopicClick }: UserMessageProps) {
  const { topics } = useChatStore(
    useShallow(state => ({
      topics: state.topics,
    }))
  );

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
      topics={topics || undefined}
      onTopicClick={onTopicClick}
    />
  );
}
