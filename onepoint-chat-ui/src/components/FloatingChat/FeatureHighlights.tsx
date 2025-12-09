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
    <div className="bg-[#fafffe]/60 dark:!bg-[#1F1925]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#636565] dark:border-[#fafffe] hover:shadow-lg transition-all duration-300 hover:border-[#9a19ff] dark:hover:border-[#9a19ff]">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#9a19ff]/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
        {children}
      </div>
      <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:!text-[#fafffe] mb-1.5 sm:mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 dark:!text-[#fafffe] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
