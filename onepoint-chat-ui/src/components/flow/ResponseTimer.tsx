import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useChatStore from '../../store/chatStore';

export default function ResponseTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { isThinking } = useChatStore(
    useShallow(state => ({
      isThinking: state.isThinking,
    }))
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isThinking) {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 100);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isThinking]);

  const formatTime = (milliseconds: number): string => {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    } else {
      return `${(milliseconds / 1000).toFixed(1)}s`;
    }
  };

  // Show thinking timer
  if (isThinking) {
    return (
      <div className="fixed top-4 right-4 bg-[#9a19ff]/90 text-white px-3 py-2 rounded-lg shadow-lg z-50">
        <span className="text-sm font-medium">Thinking... {formatTime(elapsedTime)}</span>
      </div>
    );
  }

  // Show final result
  if (elapsedTime > 0) {
    return (
      <div className="fixed top-4 right-4 bg-green-500/90 text-white px-3 py-2 rounded-lg shadow-lg z-50">
        <span className="text-sm font-medium">Response time: {formatTime(elapsedTime)}</span>
      </div>
    );
  }

  return null;
}
