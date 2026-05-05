import type { LLMProviderName } from "./enums";
import type { TenantPublicBranding } from "./tenantPublicBranding";

/** Document in osca-registry.clients */
export interface ClientDocument {
  _id: string;
  name: string;
  projectName: string;
  token: string;
  domains: string[];
  provider: LLMProviderName;
  model: string;
  prompt: string;
  dbName: string;
  active: boolean;
  createdAt: string;
  topicsPrompt?: string;
  predefinedQuickQuestions?: { id: number; text: string; label?: string }[];
  publicBranding?: TenantPublicBranding;
}
