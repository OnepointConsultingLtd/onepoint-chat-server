interface HandleCopyToClipboardProps {
	text: string;
	setCopied?: (copied: boolean) => void;
	id?: string;
	setCopiedId?: (id: string | null) => void;
}

// Fallback function for when Clipboard API is not available
function copyText(text: string): void {
	// Create a hidden textarea
	const textarea = document.createElement("textarea");
	textarea.value = text;
	document.body.appendChild(textarea);

	// Select the text
	textarea.select();
	textarea.setSelectionRange(0, textarea.value.length); // for iOS support

	document.body.removeChild(textarea);
}

export const handleCopyToClipboard = async ({ text, setCopied, id, setCopiedId }: HandleCopyToClipboardProps) => {
	try {
		if (typeof navigator !== 'undefined' && navigator?.clipboard) {
			await navigator.clipboard.writeText(text);
		} else {
			copyText(text);
		}

		if (setCopied) {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}

		if (setCopiedId && id) {
			setCopiedId(id);
			setTimeout(() => setCopiedId(null), 2000);
		}
	} catch (error) {
		console.error('Failed to copy to clipboard:', error);
		try {
			copyText(text);

			if (setCopied) {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}

			if (setCopiedId && id) {
				setCopiedId(id);
				setTimeout(() => setCopiedId(null), 2000);
			}
		} catch (fallbackError) {
			console.error('Fallback copy method also failed:', fallbackError);
		}
	}
};