import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { PROJECT_INFO } from '../lib/constants';
import { getConversationId } from '../lib/persistence';
import useChatStore from '../store/chatStore';
import CloseIcon from './Menus/CloseIcon';
import DeleteConfirmModal from './DeleteConfirmModal';
import { useUserContext } from '../hooks/useUserContext';
import { Conversation, fetchUserConversationHistory } from '../utils/fetchChatHistory';

type SidebarProps = {
  continueConversation: (conversationId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<boolean>;
};

export default function Sidebar({ continueConversation, deleteConversation }: SidebarProps) {
  const {
    isSidebarOpen,
    toggleSidebar,
  } = useChatStore(
    useShallow(state => ({
      isSidebarOpen: state.isSidebarOpen,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  const [conversationHistoryState, setConversationHistoryState] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { userId } = useUserContext();
  const activeId = getConversationId();

  const conversationHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (userId) {
        const history = await fetchUserConversationHistory(userId);
        setConversationHistoryState(history);
        return history;
      }
      return [];
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      setError('Failed to load conversation history');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    conversationHistory();
  }, [conversationHistory]);

  const handleConversationClick = async (conversationId: string) => {
    try {
      await continueConversation(conversationId);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    setPendingDeleteId(conversationId);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    setConversationHistoryState(prev => prev.filter(c => c.conversationId !== pendingDeleteId));
    const deleted = await deleteConversation(pendingDeleteId);
    if (!deleted) conversationHistory();
    setPendingDeleteId(null);
    setIsDeleting(false);
  };

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: dateObj.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const formatTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const truncateMessage = (message: string, maxLength: number = 100): string => {
    if (!message) return 'No message preview';
    // Remove markdown formatting for preview
    const plainText = message.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  };

  const renderConversationHistory = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 dark:border-gray-600 border-t-[#9a19ff] dark:border-t-[#9a19ff] mb-4"></div>
          <span className="text-gray-600 dark:!text-[#fafffe]">Loading conversations...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12 px-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 mb-2 font-medium">{error}</p>
          <button
            onClick={conversationHistory}
            className="cursor-pointer text-[#9a19ff] dark:!text-[#9a19ff] hover:text-[#9a19ff] dark:hover:!text-[#9a19ff] underline text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    if (conversationHistoryState.length === 0) {
      return (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:!text-[#fafffe] font-medium mb-1">No conversations yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Start a new conversation to see it here</p>
        </div>
      );
    }

    return (
      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#d1d5db transparent',
      }}>
        {conversationHistoryState.map((conversation) => {
          const isSelected = conversation.conversationId === activeId;
          return (
            <div
              key={conversation.conversationId}
              role="button"
              tabIndex={0}
              onClick={() => handleConversationClick(conversation.conversationId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleConversationClick(conversation.conversationId);
                }
              }}
              className={`cursor-pointer w-full text-left p-4 rounded-lg border transition-all duration-200 group ${isSelected
                ? 'border-[#9a19ff] dark:border-[#9a19ff] bg-[#f5f0ff] dark:bg-[#352840]'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a1f35] hover:border-[#9a19ff] dark:hover:border-[#9a19ff] hover:bg-gray-50 dark:hover:bg-[#352840]'
                }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {conversation.isActive && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#9a19ff]"></span>
                    )}
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {formatDate(conversation.lastUpdated)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:!text-[#fafffe] line-clamp-2 group-hover:text-[#9a19ff] dark:group-hover:text-[#9a19ff] transition-colors">
                    {truncateMessage(conversation.userMessage)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {conversation.messageCount} {conversation.messageCount === 1 ? 'message' : 'messages'}
                  </span>
                  <span>{formatTime(conversation.lastUpdated)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDeleteClick(e, conversation.conversationId)}
                    className="cursor-pointer p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete conversation"
                  >
                    <svg className="w-4 h-4 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#9a19ff] dark:group-hover:text-[#9a19ff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <DeleteConfirmModal
        isOpen={!!pendingDeleteId}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
      <div className="h-screen lg:!sticky top-0 z-[120]">
        <div className="flex flex-col h-screen">
          <div onClick={toggleSidebar}>
            <div
              className={`fixed inset-y-0 min-h-screen ${isSidebarOpen ? 'block left-0 w-[300px] lg:!w-[385px]' : '-left-[1180px] w-0 hidden'
                } transition-all duration-300 lg:!relative z-50 flex flex-col h-full animate-fade-in bg-[#fafffe] dark:!bg-[#1F1925]`}
              onClick={e => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 lg:!hidden !block bg-[#fafffe] dark:!bg-[#1F1925] shadow-sm">
                <div className="flex items-center justify-between px-5 h-16">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#9a19ff] flex items-center justify-center mr-3 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                        <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-900 dark:!text-[#fafffe]">
                        {PROJECT_INFO.NAME}
                      </h1>
                      <p className="text-xs text-gray-500 dark:!text-[#fafffe]">AI Assistant</p>
                    </div>
                  </div>
                  <CloseIcon />
                </div>
              </div>

              {/* Desktop Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 hidden lg:!flex justify-between items-center">
                <div className="flex items-center px-6 py-5">
                  <div className="w-12 h-12 rounded-lg bg-[#9a19ff] flex items-center justify-center mr-4 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:!text-[#fafffe]">
                      {PROJECT_INFO.NAME}
                    </h1>
                    <p className="text-sm text-gray-600 dark:!text-[#fafffe] mt-0.5">
                      {PROJECT_INFO.NAME_DESCRIPTION}
                    </p>
                  </div>
                </div>
                <div className="px-6">
                  <CloseIcon />
                </div>
              </div>

              {/* Conversation History Section */}
              <div
                className="flex-1 px-6 py-3"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 dark:!text-[#fafffe] mb-1 flex items-center">
                    Your chat{' '}
                    (<span className="text-sm text-gray-500 dark:text-gray-400">{conversationHistoryState.length > 0 && `${conversationHistoryState.length}`}</span>)
                  </h2>

                </div>

                {renderConversationHistory()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
