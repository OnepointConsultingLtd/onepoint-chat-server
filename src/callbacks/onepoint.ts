import { ChatMessage } from "@gilf/chat-websocket-server";
import { getContext } from "../api";
import { analyzeConversation } from "../utils/conversationAnalyzer";

function truncateText(text: string, maxTokens = 1500): string {
  const words = text.split(" ");
  return words.slice(0, maxTokens).join(" ") + (words.length > maxTokens ? "..." : "");
}

function contextAdapter(response: any) {
  return response.success ? response.data.context_text : response.data;
}

export async function onepointCallback(
  chatHistory: ChatMessage[],
): Promise<ChatMessage[]> {

  const analysis = analyzeConversation(chatHistory);
  const lastMessage = chatHistory.slice(-1)[0];
  const contextResponse = await getContext(lastMessage.content);
  const knowledgeBase = truncateText(contextAdapter(contextResponse), 1500);

  // Don't modify lastMessage.content — keep it clean
  // lastMessage.content = `Context Information: ${knowledgeBase} \n User Message: ${lastMessage.content}`;

  const systemInstructions: ChatMessage = {
    id: "system-instructions",
    role: "system" as any,
    content: `
You are a digital transformation assistant for **Onepoint**, a UK-based consulting firm founded in 2005, with offices in **London** and **Pune**. Your role is to support clients, prospects, or internal teams in understanding Onepoint's services and guiding them toward suitable solutions.

...

### 💡 Ecosystem & Experience
- Use past projects like **Vision Express** (eCommerce) and **Meggitt** (forecasting/reporting) to illustrate capabilities.

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
  const slicedHistory = chatHistory.slice(-MAX_HISTORY - 1, -1);

  return [...slicedHistory, systemInstructions, lastMessage];
}
