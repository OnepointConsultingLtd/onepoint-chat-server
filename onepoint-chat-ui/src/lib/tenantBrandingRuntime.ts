import type { TenantPublicBranding } from '../type/tenantUi';

let tenantUiRevision = 0;

export function bumpTenantUiRevision(): void {
  tenantUiRevision += 1;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('osca-tenant-hydrated'));
  }
}

export function getTenantUiRevision(): number {
  return tenantUiRevision;
}

export function subscribeTenantUi(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('osca-tenant-hydrated', cb);
  return () => window.removeEventListener('osca-tenant-hydrated', cb);
}

const THEME_DEFAULTS: Required<
  Pick<
    NonNullable<TenantPublicBranding['theme']>,
    | 'accent'
    | 'accentSecondary'
    | 'bgLight'
    | 'bgDark'
    | 'surfaceDark'
    | 'surfaceDarkHover'
    | 'textOnDark'
    | 'textMuted'
    | 'borderLight'
    | 'borderDark'
    | 'landingBg'
  >
> = {
  accent: '#9a19ff',
  accentSecondary: '#c084fc',
  bgLight: '#fafffe',
  bgDark: '#1F1925',
  surfaceDark: '#2a1f35',
  surfaceDarkHover: '#352840',
  textOnDark: '#fafffe',
  textMuted: '#7B6A90',
  borderLight: '#636565',
  borderDark: '#fafffe',
  landingBg: '#0D0A14',
};

/**
 * Merges tenant theme with defaults and sets CSS variables on :root for use in Tailwind
 * arbitrary values, e.g. `text-[color:var(--osca-accent)]`.
 */
export function applyTenantBrandingCss(branding?: TenantPublicBranding | null): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const t = { ...THEME_DEFAULTS, ...branding?.theme };

  root.style.setProperty('--osca-accent', t.accent);
  root.style.setProperty('--osca-accent-secondary', t.accentSecondary);
  root.style.setProperty('--osca-bg-light', t.bgLight);
  root.style.setProperty('--osca-bg-dark', t.bgDark);
  root.style.setProperty('--osca-surface-dark', t.surfaceDark);
  root.style.setProperty('--osca-surface-dark-hover', t.surfaceDarkHover);
  root.style.setProperty('--osca-text-on-dark', t.textOnDark);
  root.style.setProperty('--osca-text-muted', t.textMuted);
  root.style.setProperty('--osca-border-light', t.borderLight);
  root.style.setProperty('--osca-border-dark', t.borderDark);
  root.style.setProperty('--osca-landing-bg', t.landingBg);

  const sans =
    branding?.fontSans?.trim() ||
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
  const display = branding?.fontDisplay?.trim() || 'Georgia, "Times New Roman", serif';
  root.style.setProperty('--osca-font-sans', sans);
  root.style.setProperty('--osca-font-display', display);
}
