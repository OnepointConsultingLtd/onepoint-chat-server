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
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 md:p-6 border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300">
      <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
        {children}
      </div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
