export enum MessageType {
  STREAM_START = "stream-start",
  STREAM_CHUNK = "stream-chunk",
  STREAM_END = "stream-end",
  MESSAGE = "message",
  ERROR = "error",
  CONVERSATION_ID = "conversation-id",
  IMPORT_HISTORY = "import-history",
  HEARTBEAT = "heartbeat",
  REQUEST_CONVERSATION_ID = "request-conversation-id",
}

export enum MessageSubtype {
  STREAM_END_ERROR = "streamEndError",
}

export enum Role {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export type LLMProviderName = "openai" | "claude" | "gemini";
