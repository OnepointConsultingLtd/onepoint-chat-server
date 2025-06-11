import { useState } from 'react';
import { CiExport } from 'react-icons/ci';
import { FaMarkdown } from 'react-icons/fa';
import { MdOutlineRestartAlt, MdPictureAsPdf } from 'react-icons/md';
import { nameDescription, siteName } from '../lib/constants';
import { Message } from '../type/types';
import { exportChatToMarkdown, exportChatToPDF } from '../utils/exportChat';
import GradientButton, { MiniGradientButton } from './GradientButton';

interface HeaderProps {
  handleRestart: () => void;
  chatHistory: Message[];
}

export default function Header({ handleRestart, chatHistory }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = (type: 'markdown' | 'pdf') => {
    const date = new Date().toISOString().split('T')[0];
    if (type === 'markdown') {
      exportChatToMarkdown(chatHistory, `chat-history-${date}.md`);
    } else {
      exportChatToPDF(chatHistory, `chat-history-${date}.pdf`);
    }
    setShowDropdown(false);
  };

  return (
    <div className="w-full mx-auto mr-8">
      <div className="flex justify-between items-center">
        <header className="bg-white p-4 w-full relative">
          <div className="flex items-center space-x-4 w-full justify-between">
            {/* Logo, title and description */}
            <div className="flex items-start flex-col space-x-4 pr-4">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">
                {siteName}
              </h1>
              <p className="text-gray-600 lg:text-base text-sm md:block hidden">
                {nameDescription}
              </p>
            </div>

            <div className="flex justify-start md:flex-row flex-col gap-4 space-x-2">
              <div className="relative w-auto">
                <GradientButton onClick={() => setShowDropdown(!showDropdown)} icon={<CiExport />}>
                  Export
                </GradientButton>

                {showDropdown && (
                  <>
                    {/* Invisible overlay for outside click */}
                    <div
                      className="fixed inset-0 z-30 w-full h-screen "
                      onClick={() => setShowDropdown(false)}
                      aria-label="Close dropdown"
                    ></div>
                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl z-40 border border-gray-200 animate-fade-in-slide overflow-hidden flex flex-col py-2">
                      <MiniGradientButton
                        onClick={() => handleExport('markdown')}
                        icon={<FaMarkdown />}
                      >
                        Markdown
                      </MiniGradientButton>
                      <MiniGradientButton
                        onClick={() => handleExport('pdf')}
                        icon={<MdPictureAsPdf />}
                      >
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
          </div>
        </header>
      </div>
    </div>
  );
}
