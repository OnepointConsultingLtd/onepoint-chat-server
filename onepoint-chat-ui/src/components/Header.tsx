import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useEffect, useRef, useState } from 'react';
import { CiExport } from 'react-icons/ci';
import { FaMarkdown } from 'react-icons/fa';
import { FiCheck, FiShare2 } from 'react-icons/fi';
import { MdOutlineRestartAlt, MdPictureAsPdf } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';
import { useExport } from '../hooks/useExport';
import { useUserContext } from '../hooks/useUserContext';
import { handleCopyToClipboard } from '../lib/handleCopyToClipboard';
import useChatStore from '../store/chatStore';
import GradientButton, { MiniGradientButton } from './GradientButton';
import SideBarButton from './SideBarButton';
import ThemeToggle from './ThemeToggle';
import Toast from './Toast';

export default function Header() {
  const { isSignedIn, isLoaded } = useUser();
  const { userId } = useUserContext();
  const prevSignedInRef = useRef<boolean | undefined>(undefined);


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

  const { loadSharedChatById } = useChatStore(
    useShallow(state => ({
      loadSharedChatById: state.loadSharedChatById,
    }))
  );

  // When user logs in, clear anonymous conversationId and fetch their active conversation
  useEffect(() => {
    if (isLoaded && prevSignedInRef.current === false && isSignedIn && userId) {

      // CRITICAL: Clear conversationId from localStorage to prevent reusing anonymous conversation
      const oldConversationId = localStorage.getItem('conversationId');
      if (oldConversationId) {
        console.log(`[Header] Clearing anonymous conversationId from localStorage: ${oldConversationId}`);
        localStorage.removeItem('conversationId');
      }

      // User just logged in - fetch their active conversation
      fetch(`${window.oscaConfig.httpUrl}/api/conversations/user/${userId}/active`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return { conversationId: null };
        })
        .then(data => {
          if (data.conversationId && data.chatHistory && data.chatHistory.length > 0) {
            // User has an active conversation with messages - load it
            console.log(`[Header] Loading user active conversation: ${data.conversationId}`);
            loadSharedChatById(data.conversationId).then(success => {
              if (success) {
                console.log('[Header] User active conversation loaded successfully');
              } else {
                console.error('[Header] Failed to load user active conversation');
              }
            });
          } else {
            // No active conversation or empty - will create new one when user sends first message
            console.log('[Header] No active conversation found for user - will create new one on first message');
          }
        })
        .catch(error => {
          console.error('[Header] Error fetching user active conversation:', error);
        });
    }

    if (isLoaded) {
      prevSignedInRef.current = isSignedIn;
    }
  }, [isLoaded, isSignedIn, userId, loadSharedChatById]);

  return (
    <>
      {!isThreadShareMode && isLoaded && isSignedIn && (
        <div className="space-x-4 pr-4 float-left w-fit absolute top-3 left-4 !z-50">
          <SideBarButton />
        </div>
      )}

      <div className="flex justify-start md:flex-row flex-col gap-3 space-x-2 float-right w-fit absolute top-3 right-4 !z-50">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Share Button - Only show when signed in */}
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
          {/* Export Button - Only show when signed in */}
          {isLoaded && isSignedIn && !isThreadShareMode && (
            <GradientButton onClick={() => setShowDropdown(!showDropdown)} icon={<CiExport />}>
              Export
            </GradientButton>
          )}

          {/* Login Button - Show when not signed in */}
          {isLoaded && !isSignedIn && !isThreadShareMode && (
            <SignInButton mode="modal">
              <GradientButton
                onClick={() => { }}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                }
              >
                Login
              </GradientButton>
            </SignInButton>
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

        {/* User Button - Show when signed in */}
        {isLoaded && isSignedIn && !isThreadShareMode && (
          <div className="flex items-center">
            <UserButton />
          </div>
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
