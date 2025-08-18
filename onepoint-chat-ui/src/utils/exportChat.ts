import { Message } from '../type/types';

function markdownToHtml(text: string): string {
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

// export to pdf
export async function exportChatToPDF(chatHistory: Message[], filename = 'chat-history.pdf') {
  if (!chatHistory.length) {
    console.log('No chat history to export');
    return;
  }

  try {
    // Create HTML content with proper styling for wkhtmltopdf
    const htmlContent = `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="UTF-8">
					<style>
						@page {
							margin: 20mm;
							size: A4;
						}
						body {
							font-family: Arial, sans-serif;
							line-height: 1.6;
							color: #333;
							margin: 0;
							padding: 20px;
						}
						.header {
							text-align: center;
							margin-bottom: 30px;
							padding-bottom: 20px;
							border-bottom: 2px solid #eee;
						}
						.logo-container {
							text-align: center;
							margin-bottom: 20px;
						}
						.logo {
							max-width: 200px;
							height: auto;
						}
						.header h1 {
							color: #2c3e50;
							margin: 0;
							font-size: 24px;
							font-weight: bold;
						}
						.header p {
							color: #7f8c8d;
							margin: 10px 0 0;
							font-size: 14px;
						}
						.message {
							margin-bottom: 20px;
							page-break-inside: avoid;
						}
						.sender {
							font-weight: bold;
							color: #2c3e50;
							margin-bottom: 5px;
							font-size: 14px;
						}
						.content {
							margin-left: 20px;
							font-size: 13px;
							white-space: pre-wrap;
						}
						.separator {
							border-top: 1px solid #eee;
							margin: 20px 0;
						}
						@media print {
							body {
								-webkit-print-color-adjust: exact;
								print-color-adjust: exact;
							}
						}
					</style>
				</head>
				<body>
					<div class="header">
						<div class="logo-container">
							<img src="https://www.onepointltd.com/wp-content/uploads/2020/06/logo-one-point.png" alt="OnePoint Logo" class="logo">
						</div>
						<h1>OSCA Chat History</h1>
						<p>Exported on ${new Date().toLocaleString()}</p>
					</div>
					${chatHistory
            .map(
              message => `
						<div class="message">
							<div class="sender">${message.type === 'user' ? 'User' : 'OSCA'}</div>
							<div class="content">${markdownToHtml(message.text)}</div>
						</div>
						<div class="separator"></div>
					`
            )
            .join('')}
				</body>
			</html>
		`;

    // Send request to server
    const response = await fetch(`${window.oscaConfig.httpUrl}/api/export/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ htmlContent }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    // Get the PDF blob
    const pdfBlob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log(`Exporting chat history to ${filename}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
}
