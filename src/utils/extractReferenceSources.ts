import type { ReferenceSource } from "../types";

type ContextChunk = { content?: string; reference_id?: string; file_path?: string };

export default function extractReferenceSources(contextData: unknown): ReferenceSource[] {
  const data = contextData as Record<string, unknown> | null | undefined;
  const chunks: ContextChunk[] = (data?.data as { text_units_context?: ContextChunk[] } | undefined)?.text_units_context
    ?? (data?.text_units_context as ContextChunk[] | undefined)
    ?? [];
  if (chunks.length === 0) return [];

  const sources: ReferenceSource[] = [];
  const seen = new Set<string>();

  for (const chunk of chunks) {
    const content = chunk.content ?? "";
    const refId = String(chunk.reference_id ?? "");
    const filePath = chunk.file_path ?? "";
    const urlMatch = content.match(/Source:\s*(https?:\/\/[^\s\n]+)/);
    const titleMatch = content.match(/^#\s+(.+)/m);
    const url = urlMatch?.[1]?.trim();
    if (url && !seen.has(url)) {
      seen.add(url);
      sources.push({
        id: refId,
        title: titleMatch?.[1]?.split("|")[0].trim() ?? formatUrlAsTitle(url),
        url,
        filePath,
      });
    }
  }
  return sources.slice(0, 5);
}
  
  function formatUrlAsTitle(url: string): string {
	const slug = url.split("/").filter(Boolean).pop() ?? "";
	return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }