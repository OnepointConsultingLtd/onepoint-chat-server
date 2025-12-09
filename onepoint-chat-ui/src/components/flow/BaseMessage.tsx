import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';

type BaseMessageProps = {
  message: Message;
  header?: React.ReactNode;
};

export default function BaseMessage({ message, header }: BaseMessageProps) {
  return (
    <div className="border-[#9a19ff] dark:border-[#9a19ff]/60 bg-gradient-to-r from-[#fafffe] to-[#fafffe] dark:from-[#1F1925] dark:to-[#1F1925] text-black dark:!text-[#fafffe]">
      <div className="px-6 py-5 text-left">
        {header && <div className="flex items-center mb-2">{header}</div>}
        <div className="prose dark:prose-invert max-w-none">
          <RenderReactMarkdown message={message} />
        </div>
      </div>
    </div>
  );
}
