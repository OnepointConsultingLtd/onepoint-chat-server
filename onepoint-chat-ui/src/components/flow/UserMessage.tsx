import { Message } from '../../type/types';
import BaseMessage from './BaseMessage';

type UserMessageProps = {
  message: Message;
  isInitialMessage?: boolean;
};

export default function UserMessage({ message, isInitialMessage }: UserMessageProps) {
  const header = !isInitialMessage ? (
    <div className="text-xs font-medium text-[color:var(--osca-accent)] dark:!text-[color:var(--osca-accent)] uppercase tracking-wider">
      You
    </div>
  ) : null;

  return <BaseMessage message={message} header={header} />;
}
