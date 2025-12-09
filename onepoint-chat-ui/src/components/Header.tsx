import { useState } from 'react';
import { CiExport } from 'react-icons/ci';
import { FaMarkdown } from 'react-icons/fa';
import { FiCheck, FiShare2 } from 'react-icons/fi';
import { MdOutlineRestartAlt, MdPictureAsPdf } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';
import { useExport } from '../hooks/useExport';
import GradientButton, { MiniGradientButton } from './GradientButton';
import SideBarButton from './SideBarButton';
import ThemeToggle from './ThemeToggle';
import { handleCopyToClipboard } from '../lib/handleCopyToClipboard';
import Toast from './Toast';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const {
    messages,
    handleRestart,
    generateShareableId,
    isInitialMessage,
    isThreadShareMode,
    exportChatToPDF,
  } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      handleRestart: state.handleRestart,
      generateShareableId: state.generateShareableId,
      isInitialMessage: state.isInitialMessage,
      isThreadShareMode: state.isThreadShareMode,
      exportChatToPDF: state.exportChatToPDF,
    }))
  );

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const { handleExport, isExportingPdf } = useExport({
    messages,
    exportChatToPDF,
    onSuccess: message => {
      showToast(message, 'success');
      setShowDropdown(false);
    },
    onError: message => {
      showToast(message, 'error');
      setShowDropdown(false);
    },
  });

  const handleShare = async () => {
    const shareableUrl = generateShareableId();

    if (isInitialMessage || !shareableUrl) {
      return;
    }

    handleCopyToClipboard({ text: shareableUrl, setCopied });
  };

  const hasConversation = messages && messages.length >= 2 && !isInitialMessage;

  return (
    <>
      {!isThreadShareMode && (
        <div className="space-x-4 pr-4 float-left w-fit absolute top-3 left-4 !z-50">
          <SideBarButton />
        </div>
      )}

      <div className="flex justify-start md:flex-row flex-col gap-3 space-x-2 float-right w-fit absolute top-3 right-4 !z-50">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Share Button */}
        {hasConversation && !isThreadShareMode && (
          <GradientButton
            onClick={handleShare}
            icon={copied ? <FiCheck className="text-green-600" /> : <FiShare2 />}
            title={copied ? 'URL copied!' : 'Share this conversation'}
          >
            {copied ? 'Copied!' : 'Share'}
          </GradientButton>
        )}

        <div className="relative w-auto">
          {!isThreadShareMode && (
            <GradientButton onClick={() => setShowDropdown(!showDropdown)} icon={<CiExport />}>
              Export
            </GradientButton>
          )}

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-30 w-full h-screen"
                onClick={() => setShowDropdown(false)}
                aria-label="Close dropdown"
              ></div>
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-[#fafffe] dark:!bg-[#1F1925] rounded-lg shadow-lg z-40 border border-[#636565] dark:border-[#fafffe] hover:border-[#9a19ff] dark:hover:border-[#9a19ff] overflow-hidden flex flex-col py-1 ">
                <MiniGradientButton onClick={() => handleExport('markdown')} icon={<FaMarkdown />}>
                  Markdown
                </MiniGradientButton>
                <MiniGradientButton
                  onClick={() => handleExport('pdf')}
                  icon={<MdPictureAsPdf />}
                  disabled={isExportingPdf}
                >
                  {isExportingPdf ? 'Generating PDF...' : 'PDF Document'}
                </MiniGradientButton>
              </div>
            </>
          )}
        </div>
        {!isThreadShareMode && (
          <GradientButton onClick={handleRestart} icon={<MdOutlineRestartAlt />}>
            New
          </GradientButton>
        )}
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
