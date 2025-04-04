const API_KEY = process.env.CONTEXT_API_KEY;
const CONTEXT_API_URL = process.env.CONTEXT_API_URL;

if (!API_KEY) {
	throw new Error("CONTEXT_API_KEY is not set");
}

if (!CONTEXT_API_URL) {
	throw new Error("CONTEXT_API_URL is not set");
}

export async function getContext(question: string) {
	try {
		const url = CONTEXT_API_URL?.replace("{question}", encodeURIComponent(question));
		console.log("This is the url: ", url);

		const response = await fetch(url!, {
			headers: {
				"Authorization": `Bearer ${API_KEY!}`
			}
		})

		if (response.ok) {
			const data = await response.json();
			return {
				data: data,
				success: true,
			};
		} else {
			console.error("Error fetching context:", response.statusText);
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
