import React from 'react';
import { Message } from '../../type/types';
import RenderReactMarkdown from '../RenderReactMarkdown';

type BaseMessageProps = {
  message: Message;
  header?: React.ReactNode;
  readOnly?: boolean;
};

export default function BaseMessage({ message, header }: BaseMessageProps) {
  return (
    <div className="border-[color:var(--osca-accent)] dark:border-[color:color-mix(in_srgb,var(--osca-accent)_60%,transparent)] bg-gradient-to-r from-[color:var(--osca-bg-light)] to-[color:var(--osca-bg-light)] dark:from-[color:var(--osca-bg-dark)] dark:to-[color:var(--osca-bg-dark)] text-black dark:!text-[color:var(--osca-text-on-dark)]">
      <div className="px-6 py-5 text-left">
        {header && <div className="flex items-center mb-2">{header}</div>}
        <div className="prose dark:prose-invert max-w-none">
          <RenderReactMarkdown message={message} />
        </div>
      </div>
    </div>
  );
}
