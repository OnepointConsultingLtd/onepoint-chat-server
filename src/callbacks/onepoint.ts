import { ChatMessage } from "@gilf/chat-websocket-server";
import { getContext } from "../api";
import { analyzeConversation } from "../utils/conversationAnalyzer";

function truncateText(text: string, maxTokens = 5000): string {
  const words = text.split(" ");
  return words.slice(0, maxTokens).join(" ") + (words.length > maxTokens ? "..." : "");
}

function contextAdapter(response: any) {
  return response.success ? response.data.context_text : response.data;
}

function extractReferenceSources(contextData: any): any[] {
  if (!contextData || !contextData.entities_context) {
    return [];
  }

  // Extract unique file paths from entities_context
  const filePaths = new Set<string>();
  const referenceSources: any[] = [];

  contextData.entities_context.forEach((entity: any) => {
    if (entity.file_path) {
      const paths = entity.file_path.split(';');
      paths.forEach((path: string) => {
        if (path.trim() && !filePaths.has(path.trim())) {
          filePaths.add(path.trim());
          referenceSources.push({
            id: entity.id.toString(),
            title: extractTitleFromPath(path.trim()),
            filePath: path.trim(),
            description: entity.description
          });
        }
      });
    }
  });

  // Limit to 5 reference sources
  const slicedReferenceSources = referenceSources.slice(0, 3);
  console.log('Checking slicedReferenceSources', slicedReferenceSources);
  return slicedReferenceSources;
}

function extractTitleFromPath(filePath: string): string {
  // Extract filename from path and clean it up
  const filename = filePath.split('/').pop() || '';
  // Remove .txt extension and replace underscores with spaces
  return filename.replace('.txt', '').replace(/_/g, ' ').replace(/-/g, ' ');
}

export async function onepointCallback(
  chatHistory: ChatMessage[],
): Promise<{ chatHistory: ChatMessage[], referenceSources: any[] }> {

  const analysis = analyzeConversation(chatHistory);
  const lastMessage = chatHistory.slice(-1)[0];
  const contextResponse = await getContext(lastMessage.content);
  const knowledgeBase = truncateText(contextAdapter(contextResponse), 5000);
  const referenceSources = extractReferenceSources(contextResponse.data);

  const systemInstructions: ChatMessage = {
    id: "system-instructions",
    role: "system" as any,
    content: `
You are a digital transformation assistant for **Onepoint**, a UK-based consulting firm founded in 2005, with offices in **London** and **Pune**. Your role is to support clients, prospects, or internal teams in understanding Onepoint's services and guiding them toward suitable solutions.

### 🎯 Your Goals
- Understand the user's business goals and current data maturity.
- Recommend relevant Onepoint services, resources, or next steps.
- Encourage connecting with an expert when further help is needed.

--- 
Context Summary (from KB):
${knowledgeBase}

User Context (for internal understanding only - do not reference directly):
Persona: ${analysis.persona}
Relevant Services: ${analysis.services.join(", ")}
Initial Questions Complete: ${analysis.isInitialQuestionsComplete}
`
  };

  const index = chatHistory.findIndex(
    (obj) => systemInstructions.content === obj.content,
  );
  if (index !== -1) {
    chatHistory.splice(index, 1);
  }

  const MAX_HISTORY = 10;
  const slicedHistory = chatHistory.slice(-MAX_HISTORY - 1, -1)

  return {
    chatHistory: [...slicedHistory, systemInstructions, lastMessage],
    referenceSources: referenceSources
  };
}
