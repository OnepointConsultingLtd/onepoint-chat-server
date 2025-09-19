import { useEffect, useState } from 'react';
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
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📄 {fileName}</h2>
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

  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closePreview();
    }
  };

  const closePreview = () => {
    setIsFilePreviewOpen(false);
    setPreviewContent('');
    setPreviewFileName('');
  };

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

  const handleFilePreview = async (file: string) => {
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
      <div className="mt-1 p-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          📚 Reference Sources ({sources.length})
        </h4>

        <div className="space-y-2">
          {sources.map((source, index) => (
            <div
              key={index}
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
                <button
                  onClick={() => handleFilePreview(source.filePath)}
                  disabled={isLoading}
                  className="mt-1 text-blue-600 cursor-pointer dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {source.filePath.split('/').pop()}
                </button>
                📄
              </div>
            </div>
          ))}
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
