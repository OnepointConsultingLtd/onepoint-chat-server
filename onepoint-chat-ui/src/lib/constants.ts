// constants.ts
export const siteName = 'OSCA';
export const nameDescription = 'Onepoint Smart Company Advisor';
export const INITIAL_MESSAGE =
  "Welcome to Onepoint! I'm OSCA, your AI assistant. My goal is to understand your needs and guide you to the right expertise.";

export const CONNECTION_ERROR = "Connection error";

export const QUESTION_PROMPT = "Generate creative, thought-provoking questions in British English that are engaging and substantive. Use vivid language, metaphors, and imaginative scenarios to spark deep reflection and discussion. Questions should be rich and multi-layered. When the topic is about a specific person/individual, focus on their professional profile: achievements, experience, industry expertise, career milestones, leadership style, professional impact, and business contributions. Frame questions in third-person perspective asking ABOUT that person's professional journey and accomplishments.When the topic is about companies, concepts, or general subjects, use broader questioning approaches that can include advice, stories, and personal reflection.When relevant to Onepoint Consulting Ltd, incorporate their expertise in digital transformation, AI, and data solutions naturally. Avoid generic business jargon and craft questions that feel fresh, inspiring, and intellectually stimulating."

export const TOPICS_PROMPT = "Generate 4 relevant topics in British English. The correct name of Compnay is (Onepoint) and it is not OnePoint or onepoint when referencing the company. Avoid duplicates and ensure relevance to Onepoint's services and expertise."

export const CARD_WIDTH = 800;
export const CARD_GAP = 200;
export const CARD_Y_POSITION = 100;

// Mobile constants
export const MOBILE_CARD_WIDTH = 350;
export const MOBILE_CARD_GAP = 50;
export const MOBILE_CARD_X_POSITION = 50;

export const DEFAULT_ZOOM = 0.9;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1.5;

// Mobile zoom constants
export const MOBILE_DEFAULT_ZOOM = 0.7;
export const MOBILE_MIN_ZOOM = 0.3;
export const MOBILE_MAX_ZOOM = 1.2;

export const MAX_RELATED_TOPICS = 4;
export const MAX_PREVIEW_CHARS = 100;

export const TOPIC_CARD = {
  HEIGHT: 130,
  Y_SPACING: 5,
  WIDTH: 280,
};

export const MOBILE_TOPIC_CARD = {
  HEIGHT: 100,
  Y_SPACING: 10,
  WIDTH: 300,
};


export const PROJECT_CONFIG = {
  PROJECT: 'osca_v1',
  ENGINE: 'lightrag',
}
export const LOCAL_STORAGE_KEYS = {
  OSCA_STORE: 'osca-store',
}

export const ONE_TIME_TOKEN = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVwb2ludGx0ZCIsIm5hbWUiOiJvbmVwb2ludGx0ZCIsImlhdCI6MTc1NDkwMzgwNSwiZW1haWwiOiJnaWwuZmVybmFuZGVzQG9uZXBvaW50bHRkLmNvbSIsInBlcm1pc3Npb25zIjpbInJlYWQiXX0.ANGOCXagSF4wcdlikCM9ktz7KND9Hsbs47t4tHDMyt97vJVA88qSbKwuCAij54a23z83EBj9dpyQHVUA9Nz2rg"