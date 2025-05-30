import { Message } from '../../type/types';
import BaseMessage from './BaseMessage';

interface UserMessageProps {
  message: Message;
  isInitialMessage: boolean;
}

export default function UserMessage({ message, isInitialMessage }: UserMessageProps) {
  const header = !isInitialMessage ? (
    <div className="text-xs font-medium text-blue-600 uppercase tracking-wider">You</div>
  ) : null;

  return (
    <BaseMessage
      message={message}
      borderColor="blue-400"
      gradientFrom="blue-50"
      gradientTo="white"
      proseColor="blue"
      header={header}
      showTimestamp={!isInitialMessage}
    />
  );
}
