const CONTEXT_API_KEY = process.env.CONTEXT_API_KEY;
const CONTEXT_API_URL = process.env.CONTEXT_API_URL;

if (!CONTEXT_API_KEY) {
  throw new Error("CONTEXT_API_KEY is not set");
}

if (!CONTEXT_API_URL) {
  throw new Error("CONTEXT_API_URL is not set");
}

/**
 * Build LightRAG / engine context URL.
 * - Replaces `{question}` with the encoded user message.
 * - Sets `project` query param from the registry client's `projectName` (per-tenant), unless the URL
 *   template uses `{project}` (then that placeholder is replaced).
 * - Optional `CONTEXT_DEFAULT_PROJECT` in .env if a call ever lacks `projectName`.
 */


function buildContextUrl(question: string, projectName: string): string {
  const project =
    projectName.trim() ||
    process.env.CONTEXT_DEFAULT_PROJECT ||
    "onepoint_v21";


    // console.log("projectName",projectName)
    // console.log("CONTEXT_API_URL",CONTEXT_API_URL)

  let urlString = CONTEXT_API_URL!.replace("{question}", encodeURIComponent(question));

  if (urlString.includes("{project}")) {
    return urlString.replace("{project}", encodeURIComponent(project));
  }
  

  try {
    const u = new URL(urlString);
    u.searchParams.set("project", project);
    return u.toString();
  } catch {
    return urlString.replace(/([?&])project=[^&]*/i, `$1project=${encodeURIComponent(project)}`);
  }
}

export type GetContextOptions = {
  /** Registry `projectName` → LightRAG `project=` (e.g. `onepoint_v2`). */
  projectName: string;
};


// Get the context from the LightRAG engine
export async function getContext(question: string, options?: GetContextOptions) {
  try {
    const url = buildContextUrl(question, options?.projectName ?? "");


    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CONTEXT_API_KEY!}`,
      },
    });


    if (response.ok) {
      const data = await response?.json();
      return {
        data: data,
        success: true,
      };
    } else {
      console.error("Error fetching context:", response);
      return {
        data: `Can not find data regarding this: ${question} - ${response.statusText} `,
        success: false,
      };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Exception in getContext:", errorMessage);
    return {
      data: `Error processing request: ${errorMessage}`,
      success: false,
    };
  }
}
