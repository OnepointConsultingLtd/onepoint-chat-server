// core/onepointCallback.ts
import { ChatMessage } from "@gilf/chat-websocket-server";
import { getContext } from "../api";
import { analyzeConversation } from "../utils/conversationAnalyzer";
import { personaDirectives, servicesGuidance } from "../utils/personaPrompt";
import { personaFirstQuestion } from "../utils/personaFirstQuestion";

function truncateText(text: string, maxTokens = 5000): string {
  const words = text.split(" ");
  return words.slice(0, maxTokens).join(" ") + (words.length > maxTokens ? "..." : "");
}

function contextAdapter(response: any) {
  return response.success ? response.data.context_text : response.data;
}

function extractReferenceSources(contextData: any): any[] {
  if (!contextData || !contextData.entities_context) return [];
  const filePaths = new Set<string>();
  const referenceSources: any[] = [];
  contextData.entities_context.forEach((entity: any) => {
    if (entity.file_path) {
      const paths = entity.file_path.split(";").map((p: string) => p.trim()).filter(Boolean);
      for (const p of paths) {
        if (!filePaths.has(p)) {
          filePaths.add(p);
          referenceSources.push({
            id: String(entity.id),
            title: extractTitleFromPath(p),
            filePath: p,
            description: (entity.description || "").substring(0, 100),
          });
        }
      }
    }
  });
  return referenceSources.slice(0, 5);
}

function extractTitleFromPath(filePath: string): string {
  const filename = filePath.split("/").pop() || "";
  return filename.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ");
}

export async function onepointCallback(
  chatHistory: ChatMessage[],
): Promise<{ chatHistory: ChatMessage[]; referenceSources: any[] }> {
  const analysis = analyzeConversation(chatHistory);
  const lastMessage = chatHistory.slice(-1)[0];
  const contextResponse = await getContext(lastMessage.content);
  const knowledgeBase = truncateText(contextAdapter(contextResponse), 5000);
  const referenceSources = extractReferenceSources(contextResponse.data);

  const personaBlock = personaDirectives(analysis.persona);
  const servicesBlock = servicesGuidance(analysis.services);

  console.log("personaFirstQuestion ", personaFirstQuestion(analysis.persona));
  console.log("personaBlock", personaBlock);
  console.log("servicesBlock", servicesBlock);
  const systemInstructions: ChatMessage = {
    id: `system-instructions-${Date.now()}`, // unique ID; avoids equality collisions
    role: "system" as any,
    content: `
You are Osca — Onepoint Smart Company Advisor.
Your role is to represent Onepoint in business conversations — explaining our approach, services, and client outcomes, not technical tutorials.
Your purpose is to understand client goals, identify business priorities, and recommend the right Onepoint service path.


Operating Persona: ${analysis.persona}

Persona Guidelines:
${personaBlock}

Service Alignment:
${servicesBlock}

Suggested First Question:
${personaFirstQuestion(analysis.persona)}

Interaction Rules:
Business-First Rule:
- Always focus on business impact, outcomes, and value — not step-by-step technical setup or code.
- If the user requests implementation detail (e.g., Docker, Kubernetes, MLflow), summarise conceptually (≤2 bullets) and pivot to business value or service recommendation.
Example pivot: “Our architecture approach ensures scalability and reliability. We can explore this through our **AI Build** or **AI Architecture** services.”


Response Focus:
If persona = Maria → Emphasise business value, ROI, and leadership outcomes.
If persona = Mark T → Discuss architectural strategy at a business outcome level (avoid implementation commands).
If persona = Mark D → Focus on data governance, measurement, and decision-making.
If persona = Rakesh T or Rakesh D → Keep technical but brief; link back to Onepoint’s services.
If persona = Vanika → Focus on commercial clarity and partnership stages.
If persona = Destiny → Offer learning and early-career guidance aligned to Onepoint projects.


Onepoint Context (for reference only — use insights, not verbatim quotes):
${knowledgeBase}

`.trim(),
  };

  // Keep only the last N messages from the user/assistant, then append fresh system + last user
  const MAX_HISTORY = 10;
  const trimmed = chatHistory.slice(-MAX_HISTORY);
  // Remove any prior system messages to avoid stacking
  const filtered = trimmed.filter(m => m.role !== "system");

  return {
    chatHistory: [...filtered, systemInstructions, lastMessage],
    referenceSources,
  };
}
