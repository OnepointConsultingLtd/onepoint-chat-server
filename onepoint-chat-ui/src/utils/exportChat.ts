import { Message } from "../type/types";
import jsPDF from 'jspdf';

// Simple function to convert markdown to plain text
function markdownToPlainText(markdown: string): string {
	// Replace bold/italic markers
	let text = markdown.replace(/\*\*(.*?)\*\*/g, '$1');
	text = text.replace(/\*(.*?)\*/g, '$1');

	// Replace headers
	text = text.replace(/^#{1,6}\s+(.+)$/gm, '$1');

	// Replace bullet points
	text = text.replace(/^[\s-]*[-•*]\s+(.+)$/gm, '• $1');

	return text;
}

export function exportChatToMarkdown(chatHistory: Message[], filename = 'chat-history.md') {
	if (!chatHistory.length) {
		console.log("No chat history to export");
		return;
	}

	// Markdown content
	let markdownContent = `# OSCA Chat History\n\n`;
	markdownContent += `*Exported on ${new Date().toLocaleString()}*\n\n`;
	markdownContent += `---\n\n`;

	chatHistory.forEach((message, index) => {
		const sender = message.type === "user" ? "User" : "OSCA";

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

// export to pdf
export function exportChatToPDF(chatHistory: Message[], filename = 'chat-history.pdf') {
	if (!chatHistory.length) {
		console.log("No chat history to export");
		return;
	}

	// Create a new PDF document
	const doc = new jsPDF();

	// Set the font
	doc.setFont('Arial', 'normal');

	// Add title
	doc.setFontSize(16);
	doc.text('OSCA Chat History', 20, 20);

	// Add export date
	doc.setFontSize(10);
	doc.text(`Exported on ${new Date().toLocaleString()}`, 20, 30);

	doc.setFontSize(12);

	let yPosition = 40;
	const pageWidth = doc.internal.pageSize.getWidth();
	const margin = 20;
	const textWidth = pageWidth - 2 * margin;

	// Add messages
	chatHistory.forEach((message) => {
		const sender = message.type === "user" ? "User" : "OSCA";

		// Add sender
		doc.setFont('Arial', 'bold');
		doc.text(sender, margin, yPosition);
		yPosition += 7;

		// Add message text - convert markdown to plain text for better readability
		doc.setFont('Arial', 'normal');

		// Convert markdown to plain text
		const plainText = markdownToPlainText(message.text);

		// Split text to fit within page width
		const textLines = doc.splitTextToSize(plainText, textWidth);

		// Check if we need a new page
		if (yPosition + textLines.length * 7 > doc.internal.pageSize.getHeight() - margin) {
			doc.addPage();
			yPosition = 20;
		}

		doc.text(textLines, margin, yPosition);
		yPosition += textLines.length * 7 + 10;

		// Add separator line
		doc.setDrawColor(200, 200, 200);
		doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
		yPosition += 10;

		// Check if we need a new page for next message
		if (yPosition > doc.internal.pageSize.getHeight() - 30) {
			doc.addPage();
			yPosition = 20;
		}
	});

	// Save the PDF
	doc.save(filename);

	console.log(`Exporting chat history to ${filename}`);
}