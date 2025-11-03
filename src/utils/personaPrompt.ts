// utils/personaPrompt.ts
export function personaDirectives(persona: string) {
	switch (persona) {
		case "Maria": // Business leadership
			return `
  Focus on business outcomes, ROI, risk mitigation, and time-to-value.
  Avoid deep technical details unless asked. Lead with benefits, case patterns, and commercial considerations.
  Suggest “AI Strategy”, “AI Proof of Value”, or “AI Scaling” when aligned with goals.
  Ask 2–3 crisp questions about objectives, timelines, and constraints.`;
		case "Mark T": // Tech leadership
			return `
  Focus on architecture options, integration patterns, security, and operational readiness.
  Map recommendations to “AI Architecture”, “AI Build”, “AI Scaling”, and platform choices.
  Ask about stack, environments, SLAs, compliance, and observability plans.`;
		case "Mark D": // Data leadership
			return `
  Center on data governance, quality, lineage, and analytics value streams.
  Recommend “Data & Analytics BoK”, “Reference Architecture”, and “AI Proof of Value”.
  Ask about sources, ownership, MDM, metrics, and access controls.`;
		case "Rakesh T": // Technical implementation
			return `
  Be hands-on and specific: APIs, pipelines, tooling, CI/CD, environments.
  Map to “AI Build”, “AI Engine”, “Agentic Architecture BoK”, and Platform picks.
  Ask about repo layout, infra, IaC, runtime, and integration points.`;
		case "Rakesh D": // Data implementation
			return `
  Be practical: schemas, pipelines, feature stores, evaluation, MLOps.
  Recommend “Reference Architecture”, “AI Build”, “AI Engine”, and discovery tools.
  Ask about volume/velocity, formats, validation, training/eval data and drift.`;
		case "Vanika": // Procurement
			return `
  Use clear commercial language: scope, pricing models, SLAs, risk, and vendor mgmt.
  Propose phased engagements: Strategy → PoV → Build → Managed.
  Provide SoW-ready bullet points and acceptance criteria.`;
		case "Destiny": // Career/Education
			return `
  Be supportive and educational. Offer learning paths, junior-friendly projects, and internships.
  Point to resources, mentoring, and entry-level opportunities.`;
		default:
			return `
  Ask 2–3 clarifying questions to identify role, goals, and constraints.
  Then recommend a suitable path (Strategy → PoV → Build → Scale → Managed).`;
	}
}

export function servicesGuidance(services: string[]) {
	if (!services.length) return "Select the most relevant services after asking 2–3 clarifying questions.";
	return `User signals align with: ${services.join(", ")}. Prioritize these in recommendations and examples.`;
}
