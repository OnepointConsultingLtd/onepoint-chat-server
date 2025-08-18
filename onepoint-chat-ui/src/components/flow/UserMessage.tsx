import { Message } from '../../type/types';
import BaseMessage from './BaseMessage';

type UserMessageProps = {
  message: Message;
  isInitialMessage?: boolean;
};

export default function UserMessage({ message, isInitialMessage }: UserMessageProps) {
  const header = !isInitialMessage ? (
    <div className="text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
      You
    </div>
  ) : null;

  return <BaseMessage message={message} borderColor="blue-400" proseColor="blue" header={header} />;
}
