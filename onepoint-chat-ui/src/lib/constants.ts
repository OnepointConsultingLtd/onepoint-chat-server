// constants.ts
export const INITIAL_MESSAGE =
  "Welcome to Onepoint! I'm Osca, your AI assistant. My goal is to understand your needs and guide you to the right expertise.";

export const PROJECT_INFO = {
  NAME: 'Osca',
  NAME_DESCRIPTION: 'Onepoint Smart Company Advisor',
}

export const CONNECTION_ERROR = "Connection error";

export const QUESTION_PROMPT =
  "Generate clear, concise, and user-friendly questions in British English. Keep questions short (under 12 words) and direct, focusing on helping a user quickly understand the topic. Use simple,practical wording instead of abstract or poetic language. When relevant to Onepoint Consulting Ltd, highlight their expertise in digital transformation, AI, and data solutions naturally. Questions should feel approachable and easy to click, like FAQ items a client would want quick answers to."

export const TOPICS_PROMPT =
  "Generate 4 relevant topics in British English, formatted as a simple bulleted list. Always use the correct company name (Onepoint) — never OnePoint or onepoint.  Avoid duplicates and ensure all topics are directly relevant to Onepoint’s services and expertise (digital transformation, AI, data solutions, and consulting). Keep topic titles concise and professional. avoid too much AI and large language models related topics"

export const CARD_WIDTH = 800;
export const CARD_GAP = 200;
export const CARD_Y_POSITION = 100;

export const DEFAULT_ZOOM = 0.9;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1.5;

export const MAX_RELATED_TOPICS = 4;
export const MAX_PREVIEW_CHARS = 100;

export const TOPIC_CARD = {
  HEIGHT: 130,
  Y_SPACING: 5,
  WIDTH: 280,
};

export const PROJECT_CONFIG = {
  PROJECT: 'osca_v1',
  ENGINE: 'lightrag',
}
export const LOCAL_STORAGE_KEYS = {
  OSCA_STORE: 'osca-store',
}

export const ONE_TIME_TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVwb2ludGx0ZCIsIm5hbWUiOiJvbmVwb2ludGx0ZCIsImlhdCI6MTc1NDkwMzgwNSwiZW1haWwiOiJnaWwuZmVybmFuZGVzQG9uZXBvaW50bHRkLmNvbSIsInBlcm1pc3Npb25zIjpbInJlYWQiXX0.ANGOCXagSF4wcdlikCM9ktz7KND9Hsbs47t4tHDMyt97vJVA88qSbKwuCAij54a23z83EBj9dpyQHVUA9Nz2rg"