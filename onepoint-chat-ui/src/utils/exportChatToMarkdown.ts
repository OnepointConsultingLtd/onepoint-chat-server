import { Message } from "../type/types";

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

		markdownContent += `${sender}\n`;

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