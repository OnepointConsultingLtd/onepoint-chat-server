import { siteName } from '../../lib/constants';
import { Message } from '../../type/types';
import BaseMessage from './BaseMessage';

export default function AgentMessage({ message }: { message: Message }) {
  const header = (
    <div className="flex items-center">
      <div className="text-xs font-medium text-indigo-600 dark:text-indigo-700 uppercase tracking-wider">
        {siteName}
      </div>
      <div className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-indigo-100 dark:bg-indigo-200 text-indigo-600 dark:text-indigo-800 rounded-sm">
        AI advisor
      </div>
    </div>
  );

  return (
    <BaseMessage message={message} borderColor="indigo-500" proseColor="indigo" header={header} />
  );
}
