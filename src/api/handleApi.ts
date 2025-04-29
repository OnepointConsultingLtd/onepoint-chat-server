import { getCollection } from "./mongoClient";

const MESSAGE_START_STRING = "    User Message:"
const MESSAGE_END_STRING = "    Remember to:"
const NEW_MESSAGE_START_STRING = "User Message to which you are responding:"
const NEW_MESSAGE_END_STRING = ""  // No specific end marker in new format

function extractUserMessageContent(content: string): string {
  console.log("Checking the content", content)

  // If content doesn't contain any of our marker strings, return it as is
  if (!content.includes(MESSAGE_START_STRING) && !content.includes(NEW_MESSAGE_START_STRING)) {
    return content
  }

  const lines = content.split('\n');
  let isCapturing = false;
  let userMessage = "";

  // Check for old format first
  if (content.includes(MESSAGE_START_STRING)) {
    for (const line of lines) {
      if (!isCapturing && line.includes(MESSAGE_START_STRING)) {
        isCapturing = true;
      } else if (isCapturing && line.includes(MESSAGE_END_STRING)) {
        isCapturing = false;
        break;
      } else if (isCapturing) {
        userMessage += line + "\n";
      }
    }
  }

  // Check for new format
  else if (content.includes(NEW_MESSAGE_START_STRING)) {
    for (const line of lines) {
      if (!isCapturing && line.includes(NEW_MESSAGE_START_STRING)) {
        isCapturing = true;
        continue;
      } else if (isCapturing) {
        userMessage += line + "\n";
      }
    }
  }

  console.log("The User message", userMessage.trim())

  return userMessage.trim();
}

export async function getChatHistory(conversationId: string) {
  try {
    const collection = await getCollection();

    const conversation = await collection.findOne({ conversationId });

    if (conversation) {
      return formatConversationHistory(conversation);
    }

    const lastConversation = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (lastConversation.length > 0) {
      return formatConversationHistory(lastConversation[0]);
    }
    console.log("No conversations found in database");
    return [];
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    return [];
  }
}

function formatConversationHistory(conversation: any) {
  // Get chat history from the conversation
  let history = conversation.chatHistory
    .filter((msg: any) => ["assistant", "user"].includes(msg.role))
    .map((msg: any) => {
      return {
        ...msg,
        content: extractUserMessageContent(msg.content),
        conversationId: conversation.conversationId
      };
    });

  console.log("The history", history);

  // Check if the last message is missing from the history (e.g., not yet saved)
  if (conversation.userMessage &&
    (history.length === 0 ||
      history[history.length - 1].content !== conversation.userMessage)) {
    // If we have a userMessage field but it's not in the history, add it
    console.log("Adding missing last user message:", conversation.userMessage);
    history.push({
      role: 'user',
      content: conversation.userMessage,
      conversationId: conversation.conversationId
    });
  }

  return history;
}

export async function saveChatHistory(chatHistory: any[], conversationId: string) {
  try {
    const collection = await getCollection();

    // Extract the last user message
    const lastUserMessageIndex = [...chatHistory].reverse().findIndex(msg => msg.role === 'user');
    const lastUserMessage = lastUserMessageIndex >= 0
      ? chatHistory[chatHistory.length - 1 - lastUserMessageIndex].content
      : '';

    // Extract the user message content if it exists
    const userMessage = lastUserMessage
      ? extractUserMessageContent(lastUserMessage)
      : '';

    console.log("Saving last user message:", userMessage);

    await collection.updateOne(
      { conversationId },
      {
        $set: {
          conversationId,
          chatHistory,
          userMessage: userMessage,
          timestamp: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    console.log("Conversation saved/updated in MongoDB.");
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
}