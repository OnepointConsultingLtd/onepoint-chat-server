// constants.ts
export const INITIAL_MESSAGE =
  "Welcome to Onepoint! I'm OSCA, your AI Advisor. What challenge or opportunity in d";

export const PROJECT_INFO = {
  NAME: 'Osca',
  NAME_DESCRIPTION: 'Onepoint Smart Company Advisor',
}

export const CONNECTION_ERROR = "Connection error";

export const QUESTION_PROMPT =
  "Generate clear, concise, and user-friendly questions in British English. Keep questions short (under 12 words) and direct, focusing on helping a user quickly understand the topic. Use simple,practical wording instead of abstract or poetic language. When relevant to Onepoint Consulting Ltd, highlight their expertise in digital transformation, AI, and data solutions naturally. Questions should feel approachable and easy to click, like FAQ items a client would want quick answers to."

export const TOPICS_PROMPT =
  "Generate 5 relevant topics in British English, formatted as a simple bulleted list. Always use the correct company name (Onepoint) — never OnePoint or onepoint.  Avoid duplicates and ensure all topics are directly relevant to Onepoint’s services and expertise (digital transformation, AI, data solutions, and consulting). Keep topic titles concise and professional. avoid too much AI and large language models related topics"

export const CARD_WIDTH = 800;
export const CARD_GAP = 200;
export const CARD_Y_POSITION = 100;

export const DEFAULT_ZOOM = 0.9;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1.5;

export const MAX_RELATED_TOPICS = 10;
export const MAX_PREVIEW_CHARS = 100;

export const TOPIC_CARD = {
  HEIGHT: 130,
  Y_SPACING: 5,
  WIDTH: 280,
};

export const PROJECT_CONFIG = {
  PROJECT: 'onepoint_v2',
  ENGINE: 'lightrag',
}
export const LOCAL_STORAGE_KEYS = {
  OSCA_STORE: 'osca-store',
}

export const ONE_TIME_TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtdXJ0YXphIiwibmFtZSI6Ik11cnRhemEiLCJpYXQiOjE3NTkxMzA3NDMsImVtYWlsIjoibXVydGF6YUBnbWFpbC5jb20iLCJwZXJtaXNzaW9ucyI6WyJyZWFkIiwid3JpdGUiXX0.Okbw0pfpEB4cNE2Qopu6Ckpl3lNwZiwXAfrY0CgdLZn_3IBTAv1dvXfs7BicXahgVl8Et7Rlm2ASjbDOCvkKoQ"