interface HandleCopyToClipboardProps {
	text: string;
	setCopied?: (copied: boolean) => void;
	id?: string;
	setCopiedId?: (id: string | null) => void;
}

export const handleCopyToClipboard = async ({ text, setCopied, id, setCopiedId }: HandleCopyToClipboardProps) => {
	if (typeof navigator === 'undefined' || !navigator?.clipboard) {
		console.warn('Clipboard API not available');
		return;
	}

	try {
		await navigator.clipboard.writeText(text);

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
	}
};