export default function markdownToHtmlFormat(text: string): string {
	return (
		text
			// Convert bold text
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Convert italic text
			.replace(/\*(.*?)\*/g, '<em>$1</em>')
			// Convert numbered lists
			.replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>')
			// Convert newlines
			.replace(/\n/g, '<br>')
			// Escape HTML
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			// Restore HTML tags we want to keep
			.replace(/&lt;strong&gt;/g, '<strong>')
			.replace(/&lt;\/strong&gt;/g, '</strong>')
			.replace(/&lt;em&gt;/g, '<em>')
			.replace(/&lt;\/em&gt;/g, '</em>')
			.replace(/&lt;li&gt;/g, '<li>')
			.replace(/&lt;\/li&gt;/g, '</li>')
			.replace(/&lt;br&gt;/g, '<br>')
	);
}