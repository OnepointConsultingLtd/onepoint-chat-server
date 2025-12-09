import { PROJECT_INFO } from '../../lib/constants';
import { Message } from '../../type/types';
import BaseMessage from './BaseMessage';

export default function AgentMessage({ message }: { message: Message }) {
  const header = (
    <div className="flex items-center">
      <div className="text-xs font-medium text-[#9a19ff] dark:!text-[#9a19ff] uppercase tracking-wider">
        {PROJECT_INFO.NAME}
      </div>
      <div className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-[#9a19ff]/20 dark:bg-[#9a19ff]/30 text-[#9a19ff] dark:!text-[#9a19ff] rounded-sm">
        AI advisor
      </div>
    </div>
  );

  return <BaseMessage message={message} header={header} />;
}
