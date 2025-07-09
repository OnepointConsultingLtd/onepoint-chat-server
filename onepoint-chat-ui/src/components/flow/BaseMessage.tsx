import React from 'react';
import { Message, Topic, Topics } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';
import MessageTimestamp from './MessageTimestamp';
import TopicButtons from '../TopicButtons';

type BaseMessageProps = {
  message: Message;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  proseColor: string;
  header?: React.ReactNode;
  showTimestamp?: boolean;
  topics?: Topics;
  onTopicClick?: (topic: Topic) => void;
};

export default function BaseMessage({
  message,
  borderColor,
  gradientFrom,
  gradientTo,
  proseColor,
  header,
  topics,
  onTopicClick,
}: BaseMessageProps) {
  return (
    <div
      className={`border-l-4 border-${borderColor} bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`}
    >
      <div className="px-6 py-5 text-left">
        {header && (
          <div className="flex items-center mb-2">
            {header}
            <>
              <div className="ml-2 h-1 w-1 rounded-full bg-gray-300"></div>
              <MessageTimestamp timestamp={message.timestamp.toISOString()} />
            </>
          </div>
        )}
        <div className={`prose prose-${proseColor} max-w-none`}>
          <RenderReactMarkdown message={message} />
        </div>
        {topics && onTopicClick && (
          <TopicButtons topics={topics.topics} onTopicClick={onTopicClick} />
        )}
      </div>
    </div>
  );
}
