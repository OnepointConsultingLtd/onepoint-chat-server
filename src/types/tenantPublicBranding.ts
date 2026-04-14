/** Theme tokens exposed to the chat widget (hex colors). Empty = client uses built-in default. */
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

/**
 * Public-facing tenant profile for the chat UI (no token, db, domains, or system prompt).
 * Stored on the registry client document; returned from GET /api/tenant/context.
 */
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

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function clip(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max);
}

function trimStr(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return clip(t, max);
}

function cleanHex(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return HEX.test(t) ? t : undefined;
}

/** Allow safe font-family stacks: letters, numbers, space, comma, quotes, hyphen, period. */
function cleanFont(v: unknown, max: number): string | undefined {
  const s = trimStr(v, max);
  if (!s) return undefined;
  if (!/^[\w\s,.'"-]+$/i.test(s)) return undefined;
  return s;
}

function sanitizeTheme(raw: unknown): TenantPublicTheme | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const o = raw as Record<string, unknown>;
  const theme: TenantPublicTheme = {};
  const keys: (keyof TenantPublicTheme)[] = [
    "accent",
    "accentSecondary",
    "bgLight",
    "bgDark",
    "surfaceDark",
    "surfaceDarkHover",
    "textOnDark",
    "textMuted",
    "borderLight",
    "borderDark",
    "landingBg",
  ];
  for (const k of keys) {
    const h = cleanHex(o[k]);
    if (h) theme[k] = h;
  }
  return Object.keys(theme).length > 0 ? theme : undefined;
}

/** Sanitize inbound branding (admin save) and outbound context (public API). */
export function sanitizeTenantPublicBranding(raw: unknown): TenantPublicBranding | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const b = raw as Record<string, unknown>;
  const out: TenantPublicBranding = {};
  const a = trimStr(b.assistantName, 80);
  if (a) out.assistantName = a;
  const badge = trimStr(b.assistantBadge, 80);
  if (badge) out.assistantBadge = badge;
  const by = trimStr(b.byline, 120);
  if (by) out.byline = by;
  const he = trimStr(b.heroEyebrow, 200);
  if (he) out.heroEyebrow = he;
  const ht = trimStr(b.heroTitle, 500);
  if (ht) out.heroTitle = ht;
  const hs = trimStr(b.heroSubtitle, 1000);
  if (hs) out.heroSubtitle = hs;
  const lu = trimStr(b.logoUrl, 2000);
  if (lu && /^https:\/\//i.test(lu)) out.logoUrl = lu;
  const lud = trimStr(b.logoUrlDark, 2000);
  if (lud && /^https:\/\//i.test(lud)) out.logoUrlDark = lud;
  const la = trimStr(b.logoAlt, 200);
  if (la) out.logoAlt = la;
  const disc = trimStr(b.disclaimerText, 2000);
  if (disc) out.disclaimerText = disc;
  const fs = cleanFont(b.fontSans, 300);
  if (fs) out.fontSans = fs;
  const fd = cleanFont(b.fontDisplay, 300);
  if (fd) out.fontDisplay = fd;
  const th = sanitizeTheme(b.theme);
  if (th) out.theme = th;
  return Object.keys(out).length > 0 ? out : undefined;
}
