import React from 'react';

export default function FeatureHighlights({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[color:color-mix(in_srgb,var(--osca-bg-light)_60%,transparent)] dark:!bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_60%,transparent)] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] hover:shadow-lg transition-all duration-300 hover:border-[color:var(--osca-accent)] dark:hover:border-[color:var(--osca-accent)]">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[color:color-mix(in_srgb,var(--osca-accent)_10%,transparent)] rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
        {children}
      </div>
      <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:!text-[color:var(--osca-text-on-dark)] mb-1.5 sm:mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:!text-[color:var(--osca-text-on-dark)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
