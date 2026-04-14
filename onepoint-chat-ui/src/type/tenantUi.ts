/** Quick-pick buttons under the welcome message (from registry or app default). */
export type TenantQuickQuestion = {
  id: number;
  text: string;
  label?: string;
};

/** Hex theme tokens for the widget (mirror server `TenantPublicTheme`). */
export type TenantPublicTheme = {
  accent?: string;
  accentSecondary?: string;
  bgLight?: string;
  bgDark?: string;
  surfaceDark?: string;
  surfaceDarkHover?: string;
  textOnDark?: string;
  textMuted?: string;
  borderLight?: string;
  borderDark?: string;
  landingBg?: string;
};

/** Public tenant profile from GET /api/tenant/context (no secrets). */
export type TenantPublicBranding = {
  assistantName?: string;
  assistantBadge?: string;
  byline?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  logoUrl?: string;
  logoUrlDark?: string;
  logoAlt?: string;
  disclaimerText?: string;
  fontSans?: string;
  fontDisplay?: string;
  theme?: TenantPublicTheme;
};
