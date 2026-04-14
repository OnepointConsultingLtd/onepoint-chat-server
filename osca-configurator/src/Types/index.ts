export type LLMProvider = 'openai' | 'claude' | 'gemini'

/** Welcome-area quick picks; persisted on the registry client document. */
export type PredefinedQuickQuestion = {
  id: number
  text: string
  label?: string
}

/** Widget theme tokens (hex). Empty fields → chat UI built-in defaults. */
export type TenantPublicTheme = {
  accent: string
  accentSecondary: string
  bgLight: string
  bgDark: string
  surfaceDark: string
  surfaceDarkHover: string
  textOnDark: string
  textMuted: string
  borderLight: string
  borderDark: string
  landingBg: string
}

/** Public chat UI copy + theme; returned from GET /api/tenant/context (not token/db/domains). */
export type TenantPublicBranding = {
  assistantName: string
  assistantBadge: string
  byline: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  logoUrl: string
  logoUrlDark: string
  logoAlt: string
  disclaimerText: string
  fontSans: string
  fontDisplay: string
  theme: TenantPublicTheme
}

export function emptyTheme(): TenantPublicTheme {
  return {
    accent: '',
    accentSecondary: '',
    bgLight: '',
    bgDark: '',
    surfaceDark: '',
    surfaceDarkHover: '',
    textOnDark: '',
    textMuted: '',
    borderLight: '',
    borderDark: '',
    landingBg: '',
  }
}

export function emptyPublicBranding(): TenantPublicBranding {
  return {
    assistantName: '',
    assistantBadge: '',
    byline: '',
    heroEyebrow: '',
    heroTitle: '',
    heroSubtitle: '',
    logoUrl: '',
    logoUrlDark: '',
    logoAlt: '',
    disclaimerText: '',
    fontSans: '',
    fontDisplay: '',
    theme: emptyTheme(),
  }
}

export function normalizePublicBranding(raw: unknown): TenantPublicBranding {
  const e = emptyPublicBranding()
  if (!raw || typeof raw !== 'object') return e
  const b = raw as Record<string, unknown>
  const t =
    b.theme && typeof b.theme === 'object' ? (b.theme as Record<string, unknown>) : {}
  const th = emptyTheme()
  ;(Object.keys(th) as (keyof TenantPublicTheme)[]).forEach((k) => {
    const v = t[k]
    th[k] = typeof v === 'string' ? v : ''
  })
  return {
    assistantName: typeof b.assistantName === 'string' ? b.assistantName : '',
    assistantBadge: typeof b.assistantBadge === 'string' ? b.assistantBadge : '',
    byline: typeof b.byline === 'string' ? b.byline : '',
    heroEyebrow: typeof b.heroEyebrow === 'string' ? b.heroEyebrow : '',
    heroTitle: typeof b.heroTitle === 'string' ? b.heroTitle : '',
    heroSubtitle: typeof b.heroSubtitle === 'string' ? b.heroSubtitle : '',
    logoUrl: typeof b.logoUrl === 'string' ? b.logoUrl : '',
    logoUrlDark: typeof b.logoUrlDark === 'string' ? b.logoUrlDark : '',
    logoAlt: typeof b.logoAlt === 'string' ? b.logoAlt : '',
    disclaimerText: typeof b.disclaimerText === 'string' ? b.disclaimerText : '',
    fontSans: typeof b.fontSans === 'string' ? b.fontSans : '',
    fontDisplay: typeof b.fontDisplay === 'string' ? b.fontDisplay : '',
    theme: th,
  }
}

export interface Client {
  id: string
  name: string
  projectName: string
  /** Isolated MongoDB database name for this tenant (e.g. acme-agent-db). */
  dbName: string
  provider: LLMProvider
  model: string
  domains: string[]
  token: string
  prompt: string
  /** LightRAG related-topics instruction; empty → chat UI built-in. */
  topicsPrompt: string
  /** JSON-serializable list; empty → chat UI built-in predefined list. */
  predefinedQuickQuestions: PredefinedQuickQuestion[]
  /** Widget-facing branding; persisted on registry; exposed via /api/tenant/context. */
  publicBranding: TenantPublicBranding
  active: boolean
  createdAt: string
}

export interface GlobalConfig {
  defaultProvider: LLMProvider
  defaultModel: string
  openaiKey: string
  anthropicKey: string
  geminiKey: string
  defaultPrompt: string
  restPort: string
  wsPort: string
}
