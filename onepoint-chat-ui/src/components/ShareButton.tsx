import { useState } from 'react';
import { FiShare2, FiCheck } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../store/chatStore';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { messages, generateShareableUrl, isInitialMessage } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      generateShareableUrl: state.generateShareableUrl,
      isInitialMessage: state.isInitialMessage,
    }))
  );

  console.log('isInitialMessage', isInitialMessage);

  const handleShare = async () => {
    const shareableUrl = generateShareableUrl();

    if (isInitialMessage || !shareableUrl) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableUrl || '');
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);

      console.log('Shareable URL copied to clipboard:', shareableUrl);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback: show the URL in an alert
      alert(`Share this URL:\n${shareableUrl}`);
    }
  };

  // Only show share button if there are messages
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
          Start a conversation to share
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
      <button
        onClick={handleShare}
        className="p-3 rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        title={copied ? 'URL copied!' : 'Share this chat'}
      >
        {copied ? <FiCheck className="w-5 h-5" /> : <FiShare2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
