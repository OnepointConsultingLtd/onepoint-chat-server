import { downloadPdf } from '../lib/apiClient';
import { Message } from '../type/types';
import { htmlContent } from './htmlContent';



export function exportChatToMarkdown(chatHistory: Message[], filename = 'chat-history.md') {
	if (!chatHistory.length) {
		console.log('No chat history to export');
		return;
	}

	// Markdown content
	let markdownContent = `# OSCA Chat History\n\n`;
	markdownContent += `*Exported on ${new Date().toLocaleString()}*\n\n`;
	markdownContent += `---\n\n`;

	chatHistory.forEach((message, index) => {
		const sender = message.type === 'user' ? 'User' : 'OSCA';

		markdownContent += `### ${sender}\n\n`;
		markdownContent += `${message.text}\n\n`;

		if (index < chatHistory.length - 1) {
			markdownContent += `---\n\n`;
		}
	});

	const blob = new Blob([markdownContent], { type: 'text/markdown' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();

	console.log(`Exporting chat history to ${filename}`);
}

// export to pdf using new API
export async function exportChatToPDFApi(chatHistory: Message[], filename = 'chat-history.pdf') {
	if (!chatHistory.length) {
		console.log('No chat history to export');
		return;
	}

	try {
		const pdfBlob = await downloadPdf(htmlContent(chatHistory));

		// Create download link with the PDF blob
		const url = window.URL.createObjectURL(pdfBlob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);

		console.log(`Exporting chat history to ${filename} using new API`);
	} catch (error) {
		console.error('Error generating PDF with new API:', error);
		throw error;
	}
}
