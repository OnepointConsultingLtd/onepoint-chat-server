import type { OscaChatConfig, OscaTenantUi } from '../type/window';
import type { TenantPublicBranding, TenantQuickQuestion } from '../type/tenantUi';
import { ONE_TIME_TOKEN } from './constants';
import { applyTenantBrandingCss, bumpTenantUiRevision } from './tenantBrandingRuntime';

function applyTenantDocumentBranding(projectName?: string, branding?: TenantPublicBranding): void {
  if (typeof document === 'undefined') return;

  const assistantName = branding?.assistantName?.trim();
  const resolvedProjectName = projectName?.trim();
  const titleBase = assistantName || resolvedProjectName || 'OSCA';
  const titleByline = branding?.byline?.trim();
  const includesByline =
    Boolean(titleByline) && titleBase.toLowerCase().includes((titleByline as string).toLowerCase());
  document.title =
    titleByline && !includesByline ? `${titleBase} - ${titleByline}` : titleBase;

  const logoUrl = branding?.logoUrl?.trim();
  if (!logoUrl) return;

  let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = logoUrl;
}

function normalizeQuickQuestions(raw: unknown): TenantQuickQuestion[] {
  if (!Array.isArray(raw)) return [];
  const out: TenantQuickQuestion[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    const id = typeof o.id === 'number' ? o.id : Number(o.id);
    const text = typeof o.text === 'string' ? o.text : '';
    if (!Number.isFinite(id) || !text.trim()) continue;
    const label = typeof o.label === 'string' && o.label.trim() ? o.label : undefined;
    out.push({ id, text, ...(label ? { label } : {}) });
  }
  return out;
}

function isComplete(c: Partial<OscaChatConfig> | undefined): boolean {
  return (
    typeof c?.httpUrl === 'string' &&
    c.httpUrl.length > 0 &&
    typeof c?.websocketUrl === 'string' &&
    c.websocketUrl.length > 0 &&
    typeof c?.clientToken === 'string' &&
    c.clientToken.length > 0
  );
}

function readQueryParams(search: string): Partial<OscaChatConfig> {
  const params = new URLSearchParams(search);
  const httpUrl = params.get('oscaHttp') || params.get('httpUrl') || undefined;
  const websocketUrl = params.get('oscaWs') || params.get('websocketUrl') || undefined;
  const clientToken = params.get('oscaToken') || undefined;
  const projectName = params.get('oscaProject') || params.get('projectName') || undefined;
  return {
    ...(httpUrl ? { httpUrl } : {}),
    ...(websocketUrl ? { websocketUrl } : {}),
    ...(clientToken ? { clientToken } : {}),
    ...(projectName ? { projectName } : {}),
  };
}

/** `cfg` is often only `{ httpUrl, websocketUrl }`. Token merges from cfg → query → env → ONE_TIME_TOKEN. `projectName` only from explicit cfg / query / env — no constants default here; use `hydrateOscaTenantProject()` or `?oscaProject=` / `VITE_OSCA_PROJECT_NAME`. */
function mergeClientToken(cfg: Partial<OscaChatConfig>): OscaChatConfig {
  const fromQuery = readQueryParams(typeof window !== 'undefined' ? window.location.search : '');
  const clientToken =
    cfg.clientToken ||
    fromQuery.clientToken ||
    (import.meta.env.VITE_OSCA_CLIENT_TOKEN as string | undefined) ||
    ONE_TIME_TOKEN;

  const projectName =
    (cfg.projectName && String(cfg.projectName).trim()) ||
    (fromQuery.projectName && fromQuery.projectName.trim()) ||
    (import.meta.env.VITE_OSCA_PROJECT_NAME as string | undefined)?.trim() ||
    '';
  if (!cfg.httpUrl || !cfg.websocketUrl) {
    throw new Error('[Osca] httpUrl and websocketUrl are required');
  }

  return {
    httpUrl: cfg.httpUrl,
    websocketUrl: cfg.websocketUrl,
    clientToken,
    projectName,
  };
}

function localDevDefaults(): Pick<OscaChatConfig, 'httpUrl' | 'websocketUrl'> {
  const protocol = window.location.protocol;
  const wsProtocol = protocol === 'https:' ? 'wss' : 'ws';
  const defaultPort = 5000;
  return {
    httpUrl: `${protocol}//localhost:${defaultPort}`,
    websocketUrl: `${wsProtocol}://localhost:${defaultPort}/ws`,
  };
}

/** When not localhost, assume API/WebSocket are same host as the UI (typical reverse-proxy setup). */
function sameOriginDefaults(): Pick<OscaChatConfig, 'httpUrl' | 'websocketUrl'> {
  const protocol = window.location.protocol;
  const wsProtocol = protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.host;
  return {
    httpUrl: `${protocol}//${host}`,
    websocketUrl: `${wsProtocol}://${host}/ws`,
  };
}

/**
 * Resolves `window.oscaConfig` once per load. Priority:
 * 1. Existing complete `window.oscaConfig` (e.g. set by a host page before the bundle)
 * 2. Complete `window.__OSCA_CONFIG__`
 * 3. URL query: `oscaHttp` + `oscaWs` (+ optional `oscaToken`)
 * 4. `import.meta.env.VITE_OSCA_HTTP_URL` + `VITE_OSCA_WS_URL` (+ optional `VITE_OSCA_CLIENT_TOKEN`)
 * 5. localhost → :5000 / :4000; otherwise same-origin
 *
 * `clientToken` defaults to `ONE_TIME_TOKEN` from constants when not set (legacy dev).
 * `projectName`: explicit cfg / `?oscaProject=` / `VITE_OSCA_PROJECT_NAME`, else `''` until `hydrateOscaTenantProject()` reads the registry.
 */
export function resolveOscaConfig(): OscaChatConfig {
  window.oscaConfig ??= {};

  if (isComplete(window.oscaConfig)) {
    window.oscaConfig = mergeClientToken(window.oscaConfig as OscaChatConfig);
    return window.oscaConfig as OscaChatConfig;
  }

  const fromWindow = window.oscaConfig;
  if (fromWindow.httpUrl && fromWindow.websocketUrl) {
    window.oscaConfig = mergeClientToken(fromWindow);
    return window.oscaConfig as OscaChatConfig;
  }

  const fromGlobal = window.__OSCA_CONFIG__;
  if (fromGlobal?.httpUrl && fromGlobal?.websocketUrl) {
    window.oscaConfig = mergeClientToken(fromGlobal);
    return window.oscaConfig as OscaChatConfig;
  }

  if (isComplete(window.__OSCA_CONFIG__)) {
    window.oscaConfig = mergeClientToken(window.__OSCA_CONFIG__ as OscaChatConfig);
    return window.oscaConfig as OscaChatConfig;
  }

  const fromQuery = readQueryParams(window.location.search);
  if (fromQuery.httpUrl && fromQuery.websocketUrl) {
    window.oscaConfig = mergeClientToken(fromQuery);
    if (import.meta.env.DEV) {
      console.info('[Osca] Config from URL query params');
    }
    return window.oscaConfig as OscaChatConfig;
  }

  const fromEnv: Partial<OscaChatConfig> = {
    httpUrl: import.meta.env.VITE_OSCA_HTTP_URL,
    websocketUrl: import.meta.env.VITE_OSCA_WS_URL,
    clientToken: import.meta.env.VITE_OSCA_CLIENT_TOKEN,
    projectName: import.meta.env.VITE_OSCA_PROJECT_NAME,
  };
  if (fromEnv.httpUrl && fromEnv.websocketUrl) {
    window.oscaConfig = mergeClientToken(fromEnv);
    if (import.meta.env.DEV) {
      console.info('[Osca] Config from VITE_OSCA_* env');
    }
    return window.oscaConfig as OscaChatConfig;
  }

  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const defaults = isLocal ? localDevDefaults() : sameOriginDefaults();
  window.oscaConfig = mergeClientToken(defaults);
  if (import.meta.env.DEV) {
    console.info('[Osca] Config from defaults (' + (isLocal ? 'localhost' : 'same-origin') + ')');
  }
  return window.oscaConfig as OscaChatConfig;
}

type TenantContextResponse = {
  projectName: string;
  name: string;
  clientId: string;
  topicsPrompt?: string;
  predefinedQuickQuestions?: unknown[];
  publicBranding?: TenantPublicBranding;
};

/**
 * Fills `window.oscaConfig.projectName` and `window.oscaTenantUi` from `GET /api/tenant/context`.
 * Skips project hydration if pinned via `?oscaProject=` / `VITE_OSCA_PROJECT_NAME`.
 * UI fields (`topicsPrompt`, quick questions) load whenever the request succeeds.
 */
export async function hydrateOscaTenantProject(): Promise<void> {
  if (typeof window === 'undefined') return;

  const fromQuery = readQueryParams(window.location.search);
  const skipProjectHydrate =
    Boolean(fromQuery.projectName?.trim()) ||
    Boolean((import.meta.env.VITE_OSCA_PROJECT_NAME as string | undefined)?.trim());

  const base = window.oscaConfig as Partial<OscaChatConfig>;
  const httpUrl = base.httpUrl?.replace(/\/$/, '');
  const token = base.clientToken?.trim();
  if (!httpUrl || !token) return;

  try {
    const r = await fetch(`${httpUrl}/api/tenant/context`, {
      headers: { 'X-Osca-Token': token },
    });
    if (!r.ok) return;
    const data = (await r.json()) as TenantContextResponse;

    if (!skipProjectHydrate) {
      const pn = data.projectName?.trim();
      if (pn) {
        window.oscaConfig = { ...window.oscaConfig, projectName: pn } as OscaChatConfig;
      }
    }

    const tp = typeof data.topicsPrompt === 'string' ? data.topicsPrompt.trim() : '';
    const qq = normalizeQuickQuestions(data.predefinedQuickQuestions);
    const pb = data.publicBranding;
    const hasBranding = pb && typeof pb === 'object' && Object.keys(pb).length > 0;

    const tenantUi: OscaTenantUi = {
      ...(tp ? { topicsPrompt: tp } : {}),
      ...(qq.length > 0 ? { quickQuestions: qq } : {}),
      ...(hasBranding ? { branding: pb } : {}),
    };
    window.oscaTenantUi =
      tenantUi.topicsPrompt !== undefined ||
      tenantUi.quickQuestions !== undefined ||
      tenantUi.branding !== undefined
        ? tenantUi
        : {};

    applyTenantBrandingCss(hasBranding ? pb : undefined);
    applyTenantDocumentBranding(window.oscaConfig?.projectName, hasBranding ? pb : undefined);
    bumpTenantUiRevision();
  } catch {
    /* keep prior oscaConfig / oscaTenantUi */
  }
}

/** Headers for tenant-scoped Osca API routes (registry client resolution). */
export function oscaTenantHeaders(base?: Record<string, string>): Record<string, string> {
  const token = window.oscaConfig?.clientToken;
  if (!token) {
    console.warn('[Osca] clientToken missing — call resolveOscaConfig() first');
  }
  return {
    ...base,
    'X-Osca-Token': token ?? '',
  };
}
