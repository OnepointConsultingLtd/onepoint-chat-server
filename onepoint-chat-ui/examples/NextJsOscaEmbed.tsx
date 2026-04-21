/**
 * Drop this file into a Next.js app (App Router), e.g. `components/OscaEmbed.tsx`.
 *
 * 1) Create `.env.local` in your Next.js project (not in the osca repo):
 *
 *    NEXT_PUBLIC_OSCA_UI_ORIGIN=https://osca.onepointltd.ai
 *
 *    Local Osca backend (single port; chat WS path /ws — see src/index.ts):
 *    NEXT_PUBLIC_OSCA_HTTP_URL=http://localhost:5000
 *    NEXT_PUBLIC_OSCA_WS_URL=ws://localhost:5000
 *
 *    Production: use the public base URLs where *this* monorepo’s REST + WebSocket servers are exposed
 *    (not the LightRAG CONTEXT_API_URL / engine host unless you route chat there too).
 *
 * 2) Add to a page:
 *    import OscaEmbed from '@/components/OscaEmbed';
 *    export default function Page() { return <OscaEmbed />; }
 *
 * 3) Iframe embedding requires osca.onepointltd.ai (or your UI host) to allow framing from your site
 *    (CSP frame-ancestors / X-Frame-Options). REST + WS must allow the UI origin in CORS.
 */
'use client';

import { useMemo } from 'react';

export default function OscaEmbed() {
  const httpUrl = process.env.NEXT_PUBLIC_OSCA_HTTP_URL ?? '';
  const wsUrl = process.env.NEXT_PUBLIC_OSCA_WS_URL ?? '';
  const uiOrigin = (process.env.NEXT_PUBLIC_OSCA_UI_ORIGIN ?? 'https://osca.onepointltd.ai').replace(
    /\/$/,
    '',
  );

  const iframeSrc = useMemo(() => {
    if (!httpUrl || !wsUrl) return '';
    const q = new URLSearchParams({
      oscaHttp: httpUrl,
      oscaWs: wsUrl,
    });
    return `${uiOrigin}/?${q.toString()}`;
  }, [httpUrl, wsUrl, uiOrigin]);

  if (!iframeSrc) {
    return (
      <p className="text-sm text-neutral-600">
        Set <code>NEXT_PUBLIC_OSCA_HTTP_URL</code> and <code>NEXT_PUBLIC_OSCA_WS_URL</code> in{' '}
        <code>.env.local</code>, then restart <code>next dev</code>.
      </p>
    );
  }

  return (
    <iframe
      title="Osca"
      src={iframeSrc}
      className="h-[min(90vh,820px)] w-full max-w-5xl rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
      allow="clipboard-read; clipboard-write"
    />
  );
}
