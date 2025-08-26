import { FiShare2 } from 'react-icons/fi';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { Message } from '../../type/types';
import GradientButton from '../GradientButton';
import MessageTimestamp from './MessageTimestamp';

export default function SharedModeRender({
  userMessage,
  exitThreadShareMode,
  handleRestart,
}: {
  userMessage: Message;
  exitThreadShareMode: () => void;
  handleRestart: () => void;
}) {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 dark:from-slate-900 dark:via-gray-700 dark:to-slate-600 text-white shadow-xl">
      <div className="flex flex-row items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <FiShare2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Viewing Shared Thread</span>
              <span className="text-blue-100 text-sm">This is a read-only shared conversation</span>
              <MessageTimestamp timestamp={userMessage.timestamp} />
            </div>
          </div>
        </div>

        <div className="w-fit">
          <GradientButton
            onClick={() => {
              exitThreadShareMode();
              handleRestart();
            }}
            icon={<MdOutlineRestartAlt />}
          >
            Start New Chat
          </GradientButton>
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </div>
  );
}
