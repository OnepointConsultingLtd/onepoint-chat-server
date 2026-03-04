// core/onepointCallback.ts
import { ChatMessage } from "@gilf/chat-websocket-server";
import { getContext } from "../api";
import { analyzeConversation } from "../utils/conversationAnalyzer";
import { personaDirectives, servicesGuidance } from "../utils/personaPrompt";
import { personaFirstQuestion } from "../utils/personaFirstQuestion";

function truncateText(text: string, maxTokens = 5000): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  const words = text.split(" ");
  return words.slice(0, maxTokens).join(" ") + (words.length > maxTokens ? "..." : "");
}

function contextAdapter(response: any) {
  return response.success ? response.data.context_text : response.data;
}

// "file_path": "/var/graphrag/tennants/gil_fernandes/lightrag/onepoint_v2/input/onepoint_labs.txt",
// "chunk_id": "chunk-3ebca10abaaf06d4371a59dd9050e02d",
// "links": []
function extractReferenceSources(contextData: any): any[] {
  if (!contextData || !contextData.entities_context) return [];
  const filePaths = new Set<string>();
  const referenceSources: any[] = [];
  console.log('contextData', JSON.stringify(contextData, null, 2));
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
    // Also add the links
    if (entity.links) {
      entity.links.forEach((link: any) => {
        referenceSources.push({
          id: String(entity.id),
          title: link.title,
          filePath: link.url,
        });
      });
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

  console.log('referenceSources', referenceSources);

  const personaBlock = personaDirectives(analysis.persona);
  const servicesBlock = servicesGuidance(analysis.services);

  const britishLanguageBlock = `
  # LANGUAGE AND STYLE POLICY
  - All output must use **British English** spellings and grammar (organisation, realise, colour, programme, etc.).
  - Use British punctuation and date format (DD/MM/YYYY).
  - Never switch to American English.
  - Maintain a professional but warm tone consistent with UK business communication.
  `;


  const systemInstructions: ChatMessage = {
    id: `system-instructions-${Date.now()}`,
    role: "system" as any,
    content: `
You are Osca — Onepoint Smart Company Advisor.
Your role is to represent Onepoint in business conversations — explaining our approach, services, and client outcomes, not technical tutorials.
Your purpose is to understand client goals, identify business priorities, and recommend the right Onepoint service path.

HALLUCINATION GUARD — ABSOLUTE RULE:
Never generate, infer, or estimate any information not explicitly present 
in the Onepoint KB context provided above.
If the KB does not contain the answer, respond only with:
"I don't have that detail available. Our team can help directly."
Then provide contact details. Never fill gaps with assumed or inferred facts.


PRICING — HARD BLOCK:
Pricing, cost ranges, fees, and estimates do not exist in our KB.
Any pricing figures you might generate come from your training data — 
this is strictly prohibited. Never produce them under any circumstances.

Operating Persona: ${analysis.persona}
${britishLanguageBlock}

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

Response Length Rules (STRICT — apply every turn without exception):
- Default: ≤100 words, ≤5 bullets. No exceptions.
- Detailed mode only if user explicitly asks: ≤150 words, ≤6 bullets.
- Never expand responses as conversation length grows.
- Do not restate context, recap prior answers, or add closing summaries.
- Every response must end after the final bullet or question — no padding.


Name Policy: Never address the user by name under any circumstances, 
even if a name appears in persona metadata or conversation history.

Onepoint Context (for reference only — use insights, not verbatim quotes):
${knowledgeBase}

`.trim(),
  };

  // Keep only the last N messages from the user/assistant, then append fresh system + last user
  const MAX_HISTORY = 10;
  const slicedHistory = chatHistory.slice(-MAX_HISTORY - 1, -1)

  return {
    chatHistory: [...slicedHistory, systemInstructions, lastMessage],
    referenceSources: referenceSources
  };
}