import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { filePreview } from '../lib/apiClient';
import { ReferenceSource } from '../type/types';

interface ReferenceSourcesProps {
  sources: ReferenceSource[];
}

function FilePreviewPopUp({
  isOpen,
  onClose,
  content,
  fileName,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  fileName: string;
}) {
  if (!isOpen) return null;

  const popupContent = (
    <div
      className="fixed inset-0 bg-black/90 bg-opacity-50 flex justify-center items-center z-[9999]"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden m-4"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            📄 {fileName.replace('.txt', '').replace(/_/g, ' ').replace(/-/g, ' ')}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close Preview Modal"
            className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono">
              {content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

export default function ReferenceSources({ sources }: ReferenceSourcesProps) {
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closePreview = useCallback(() => {
    setIsFilePreviewOpen(false);
    setPreviewContent('');
    setPreviewFileName('');
  }, []);

  const closeOnEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePreview();
      }
    },
    [closePreview]
  );

  useEffect(() => {
    if (isFilePreviewOpen) {
      document.addEventListener('keydown', closeOnEscape);
      return () => {
        document.removeEventListener('keydown', closeOnEscape);
      };
    }
  }, [isFilePreviewOpen, closeOnEscape]);

  if (!sources || sources.length === 0) {
    return null;
  }

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  const handleFilePreview = async (file: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion toggle when clicking file preview
    setIsLoading(true);
    try {
      const response = await filePreview(file);
      const content = await response.text();
      setPreviewContent(content);
      setPreviewFileName(file.split('/').pop() || 'Unknown File');
      setIsFilePreviewOpen(true);
    } catch (error) {
      console.error('Error fetching file preview:', error);
      setPreviewContent('Error loading file content');
      setPreviewFileName(file.split('/').pop() || 'Unknown File');
      setIsFilePreviewOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow duration-300">
          <button
            onClick={toggleAccordion}
            className="w-full flex items-center cursor-pointer justify-between p-3 sm:p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-all duration-300 group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-110">
                📚
              </span>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Reference Sources ({sources.length})
              </h4>
            </div>
            <svg
              className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-3 sm:px-4 pb-3 pt-2.5 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2 mt-1">
                {sources.map((source, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 sm:gap-3 px-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 ${
                      isOpen ? 'animate-fade-in-up' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 30}ms`,
                    }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 sm:w-5 sm:h-5 bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center text-xs font-semibold border border-gray-200 dark:border-gray-600">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <button
                        onClick={e => handleFilePreview(source.filePath, e)}
                        disabled={isLoading}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed break-words transition-colors duration-200 text-left leading-relaxed"
                        style={{ wordBreak: 'break-word' }}
                      >
                        {source.title}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilePreviewPopUp
        isOpen={isFilePreviewOpen}
        onClose={closePreview}
        content={previewContent}
        fileName={previewFileName}
      />
    </>
  );
}
