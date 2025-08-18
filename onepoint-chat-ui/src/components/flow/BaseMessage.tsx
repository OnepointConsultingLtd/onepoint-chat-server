import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';

type BaseMessageProps = {
  message: Message;
  borderColor: string;
  proseColor: string;
  header?: React.ReactNode;
};

export default function BaseMessage({
  message,
  borderColor,
  proseColor,
  header,
}: BaseMessageProps) {
  return (
    <div
      className={`border-l-4 border-${borderColor} dark:border-${borderColor}/60 bg-gradient-to-r from-blue-50 to-white dark:from-gray-700 dark:to-gray-700 text-black dark:text-gray-200`}
    >
      <div className="px-6 py-5 text-left">
        {header && <div className="flex items-center mb-2">{header}</div>}
        <div className={`prose prose-${proseColor} dark:prose-invert max-w-none`}>
          <RenderReactMarkdown message={message} />
        </div>
      </div>
    </div>
  );
}
