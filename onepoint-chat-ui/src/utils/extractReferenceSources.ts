import { ReferenceSource } from '../type/types';

/**
 * Extracts reference sources from message content and returns both sources and cleaned content
 * @param content - The message content
 * @returns Object with referenceSources array and cleaned content
 */
export function extractReferenceSources(content: string): ReferenceSource[] {
	try {
		const startMarker = '<!-- REFERENCE_SOURCES_START -->';
		const endMarker = '<!-- REFERENCE_SOURCES_END -->';

		const startIndex = content.indexOf(startMarker);
		const endIndex = content.indexOf(endMarker);

		if (startIndex === -1 || endIndex === -1) {
			return [];
		}

		const jsonString = content.substring(
			startIndex + startMarker.length,
			endIndex
		).trim();

		if (!jsonString) {
			return [];
		}

		const referenceSources = JSON.parse(jsonString);
		return Array.isArray(referenceSources) ? referenceSources : [];
	} catch (error) {
		console.error('Error extracting reference sources:', error);
		return [];
	}
}

/**
 * Extracts reference sources and cleans the content in one operation
 * @param content - The message content
 * @returns Object with referenceSources array and cleaned content
 */
export function extractReferenceSourcesAndClean(content: string): { referenceSources: ReferenceSource[]; cleanedContent: string } {
	const referenceSources = extractReferenceSources(content);
	const cleanedContent = removeReferenceSourcesMetadata(content);
	return { referenceSources, cleanedContent };
}

/**
 * Removes reference sources metadata from system message content
 * @param content - The system message content
 * @returns Clean content without reference sources metadata
 */
export function removeReferenceSourcesMetadata(content: string): string {
	const startMarker = '<!-- REFERENCE_SOURCES_START -->';
	const endMarker = '<!-- REFERENCE_SOURCES_END -->';

	const startIndex = content.indexOf(startMarker);
	const endIndex = content.indexOf(endMarker);

	if (startIndex === -1 || endIndex === -1) {
		return content;
	}

	return content.substring(0, startIndex) + content.substring(endIndex + endMarker.length);
}
