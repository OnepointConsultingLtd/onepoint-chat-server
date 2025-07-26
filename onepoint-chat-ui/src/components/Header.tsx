import { useState } from 'react';
import { CiExport } from 'react-icons/ci';
import { FaMarkdown } from 'react-icons/fa';
import { MdOutlineRestartAlt, MdPictureAsPdf } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';
import { exportChatToMarkdown, exportChatToPDF } from '../utils/exportChat';
import GradientButton, { MiniGradientButton } from './GradientButton';
import SideBarButton from './SideBarButton';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { messages, handleRestart } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      handleRestart: state.handleRestart,
    }))
  );

  const handleExport = (type: 'markdown' | 'pdf') => {
    const date = new Date().toISOString().split('T')[0];
    if (type === 'markdown') {
      exportChatToMarkdown(messages, `chat-history-${date}.md`);
    } else {
      exportChatToPDF(messages, `chat-history-${date}.pdf`);
    }
    setShowDropdown(false);
  };

  return (
    <>
      <div className="space-x-4 pr-4 float-left w-fit absolute top-3 left-4 !z-50">
        <SideBarButton />
      </div>

      <div className="flex justify-start md:flex-row flex-col gap-4 space-x-2 float-right w-fit absolute top-3 right-4 !z-50">
        <div className="relative w-auto">
          <GradientButton onClick={() => setShowDropdown(!showDropdown)} icon={<CiExport />}>
            Export
          </GradientButton>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-30 w-full h-screen "
                onClick={() => setShowDropdown(false)}
                aria-label="Close dropdown"
              ></div>
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl z-40 border border-gray-200 animate-fade-in-slide overflow-hidden flex flex-col py-2">
                <MiniGradientButton onClick={() => handleExport('markdown')} icon={<FaMarkdown />}>
                  Markdown
                </MiniGradientButton>
                <MiniGradientButton onClick={() => handleExport('pdf')} icon={<MdPictureAsPdf />}>
                  PDF Document
                </MiniGradientButton>
              </div>
            </>
          )}
        </div>

        <GradientButton onClick={handleRestart} icon={<MdOutlineRestartAlt />}>
          New Chat
        </GradientButton>
      </div>
    </>
  );
}
