import { Topics } from "../type/types";
import { getServer } from "./server";


function createHeaders() {
	return {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJheml6aV9iYW5rIiwibmFtZSI6ImF6aXppX2JhbmsiLCJpYXQiOjE3NTIwNTk0NTYsImVtYWlsIjoibXVydGF6YS5oYXNzYW5pQG9uZXBvaW50bHRkLmNvbSIsInBlcm1pc3Npb25zIjpbInJlYWQiXX0.CNMBxgbn8xp2v6DBwJuTWr5mmz_zuY2ZLHjvNXONg6fUwAdPc3WtZaUf3FyHIYMJJbhCc8Buk_9KmUY65KG1Rg`,
		},
	};
}

//   Error handling:
async function processError(response: Response) {
	if (!response.ok) {
		const errorData = await response
			.json()
			.catch(() => ({ description: `HTTP error! status: ${response.status}` }));

		throw new Error(
			errorData.description || `HTTP error! status: ${response.status}`,
		);
	}
}

export async function fetchTopics(
	limit: number = 4,
): Promise<Topics> {
	const params = new URLSearchParams();
	params.set("project", "onepoint_v1");
	params.set("engine", "lightrag");
	params.set("limit", `${limit}`);
	params.set("add_questions", "false");
	params.set("entity_type_filter", "category");
	const response = await fetch(
		`${getServer()}/project/topics?${params.toString()}`,
		createHeaders(),
	);

	await processError(response);

	return (await response.json()) as Topics;
}
