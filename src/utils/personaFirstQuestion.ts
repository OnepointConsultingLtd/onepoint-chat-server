// utils/personaFirstQuestion.ts
export function personaFirstQuestion(persona: string) {
	switch (persona) {
		case "Maria":
			return "What are the top business goals or growth challenges you're focusing on this quarter?";
		case "Mark T":
			return "Could you tell me about your current tech architecture or integration priorities?";
		case "Mark D":
			return "How mature is your current data strategy, and what outcomes are you targeting from analytics?";
		case "Rakesh T":
			return "What’s your current technical stack or deployment setup for AI or microservices?";
		case "Rakesh D":
			return "What data infrastructure or machine learning workflows are you currently building or improving?";
		case "Vanika":
			return "Are you evaluating vendors for a new AI initiative, or looking to optimize existing contracts?";
		case "Destiny":
			return "Are you looking for learning opportunities, mentorship, or hands-on project experience in AI?";
		default:
			return "Could you tell me a bit about your role and what you're aiming to achieve?";
	}
}
