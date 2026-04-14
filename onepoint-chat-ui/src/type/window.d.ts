import type { TenantPublicBranding, TenantQuickQuestion } from './tenantUi';

export interface OscaChatConfig {
  websocketUrl: string;
  httpUrl: string;
  /** Tenant API token from osca-registry (osca_live_* or legacy opaque token). */
  clientToken: string;
  /** LightRAG / engine `project=` (registry). May be '' until `hydrateOscaTenantProject()` runs. */
  projectName: string;
}

/** Set by `hydrateOscaTenantProject()` from `GET /api/tenant/context` (registry overrides). */
export type OscaTenantUi = {
  topicsPrompt?: string;
  quickQuestions?: TenantQuickQuestion[];
  branding?: TenantPublicBranding;
};

declare global {
  interface Window {
    barrier: boolean;
    /** Always an object; may be empty until `resolveOscaConfig()` fills it. */
    oscaConfig: Partial<OscaChatConfig>;
    /** Set before the app bundle loads (host page, loader script, or inline embed). */
    __OSCA_CONFIG__?: Partial<OscaChatConfig>;
    /** Tenant UI overrides from registry; absent until hydrate succeeds. */
    oscaTenantUi?: OscaTenantUi;
  }
}
