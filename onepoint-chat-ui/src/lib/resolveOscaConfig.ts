import type { OscaChatConfig } from '../type/window';

function isComplete(c: Partial<OscaChatConfig> | undefined): c is OscaChatConfig {
  return (
    typeof c?.httpUrl === 'string' &&
    c.httpUrl.length > 0 &&
    typeof c?.websocketUrl === 'string' &&
    c.websocketUrl.length > 0
  );
}

function readQueryParams(search: string): Partial<OscaChatConfig> {
  const params = new URLSearchParams(search);
  const httpUrl = params.get('oscaHttp') || params.get('httpUrl') || undefined;
  const websocketUrl = params.get('oscaWs') || params.get('websocketUrl') || undefined;
  return {
    ...(httpUrl ? { httpUrl } : {}),
    ...(websocketUrl ? { websocketUrl } : {}),
  };
}

function localDevDefaults(): OscaChatConfig {
  const protocol = window.location.protocol;
  const wsProtocol = protocol === 'https:' ? 'wss' : 'ws';
  const defaultPort = 5000;
  return {
    httpUrl: `${protocol}//localhost:${defaultPort}`,
    websocketUrl: `${wsProtocol}://localhost:${defaultPort}/ws`,
  };
}

/** When not localhost, assume API/WebSocket are same host as the UI (typical reverse-proxy setup). */
function sameOriginDefaults(): OscaChatConfig {
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
 * 3. URL query: `oscaHttp` + `oscaWs` (or `httpUrl` + `websocketUrl`)
 * 4. `import.meta.env.VITE_OSCA_HTTP_URL` + `VITE_OSCA_WS_URL`
 * 5. localhost → :5000 / :4000; otherwise same-origin
 */
export function resolveOscaConfig(): OscaChatConfig {
  if (isComplete(window.oscaConfig)) {
    return window.oscaConfig;
  }

  if (isComplete(window.__OSCA_CONFIG__)) {
    window.oscaConfig = window.__OSCA_CONFIG__;
    return window.oscaConfig;
  }

  const fromQuery = readQueryParams(window.location.search);
  if (isComplete(fromQuery)) {
    window.oscaConfig = fromQuery;
    if (import.meta.env.DEV) {
      console.info('[Osca] Config from URL query params');
    }
    return window.oscaConfig;
  }

  function createWebsocketUrl() {
    if(!import.meta.env.VITE_OSCA_WS_URL) {
      return import.meta.env.VITE_OSCA_WS_URL
    }
    return import.meta.env.VITE_OSCA_WS_URL + (import.meta.env.VITE_OSCA_WS_URL.endsWith('/ws') ? '' : '/ws');
  }

  const fromEnv: Partial<OscaChatConfig> = {
    httpUrl: import.meta.env.VITE_OSCA_HTTP_URL,
    websocketUrl: createWebsocketUrl()
  };
  if (isComplete(fromEnv)) {
    window.oscaConfig = fromEnv;
    if (import.meta.env.DEV) {
      console.info('[Osca] Config from VITE_OSCA_* env');
    }
    return window.oscaConfig;
  }

  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  window.oscaConfig = isLocal ? localDevDefaults() : sameOriginDefaults();
  if (import.meta.env.DEV) {
    console.info('[Osca] Config from defaults (' + (isLocal ? 'localhost' : 'same-origin') + ')');
  }
  return window.oscaConfig;
}
