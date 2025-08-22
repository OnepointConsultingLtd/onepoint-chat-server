import { useState } from 'react';
import { exportChatToMarkdown } from '../utils/exportChat';
import { Message } from '../type/types';

interface UseExportProps {
	messages: Message[];
	exportChatToPDF: (filename?: string) => Promise<void>;
	onSuccess?: (message: string) => void;
	onError?: (message: string) => void;
}

export const useExport = ({ messages, exportChatToPDF, onSuccess, onError }: UseExportProps) => {
	const [isExportingPdf, setIsExportingPdf] = useState(false);

	const handleExport = async (type: 'markdown' | 'pdf') => {
		const date = new Date().toISOString().split('T')[0];

		if (type === 'markdown') {
			try {
				exportChatToMarkdown(messages, `chat-history-${date}.md`);
				onSuccess?.('Chat history exported as Markdown successfully!');
			} catch (error) {
				console.error('Markdown export failed:', error);
				onError?.('Failed to export Markdown. Please try again.');
			}
		} else {
			setIsExportingPdf(true);
			try {
				await exportChatToPDF(`chat-history-${date}.pdf`);
				onSuccess?.('PDF exported successfully!');
			} catch (error) {
				console.error('PDF export failed:', error);
				onError?.('Failed to export PDF. Please try again.');
			} finally {
				setIsExportingPdf(false);
			}
		}
	};

	return {
		handleExport,
		isExportingPdf,
	};
}; 