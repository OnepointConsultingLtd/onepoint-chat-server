import { ReferenceSource } from '../type/types';

interface ReferenceSourcesProps {
  sources: ReferenceSource[];
}

export default function ReferenceSources({ sources }: ReferenceSourcesProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 p-2">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        📚 Reference Sources ({sources.length})
      </h4>

      <div className="space-y-2">
        {sources.map((source, index) => (
          <div
            key={source.id || index}
            className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400"
          >
            <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-green-500 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                {source.title}
              </div>
              {source.description && (
                <div className="text-gray-500 dark:text-gray-200 truncate">
                  {source.description}
                </div>
              )}
              <a href={source.filePath} target="_blank" rel="noopener noreferrer">
                {source.filePath.split('/').pop()}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
