import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PROJECT_INFO } from '../lib/constants';
import { hydrateOscaTenantProject, oscaTenantHeaders, resolveOscaConfig } from '../lib/resolveOscaConfig';
import { useTenantBranding } from '../hooks/useTenantBranding';
import type { TenantPublicBranding } from '../type/tenantUi';
import { applyTenantBrandingCss, bumpTenantUiRevision } from '../lib/tenantBrandingRuntime';
import ReferenceSources from './ReferenceSources';
import '../App.css';

type ShareMessage = {
  id?: string;
  text: string;
  type: 'user' | 'agent';
  timestamp: string;
  referenceSources?: { id: string; title: string; description?: string; url: string }[];
};

type ShareData = {
  type: 'full' | 'thread';
  messages: ShareMessage[];
  conversationId: string;
  tenantName?: string;
  tenantProjectName?: string;
  publicBranding?: TenantPublicBranding;
};

export default function SharePage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | '404' | '410'>('loading');
  const [data, setData] = useState<ShareData | null>(null);
  const branding = useTenantBranding();
  const resolvedBranding = data?.publicBranding ?? branding;
  const assistantName = resolvedBranding?.assistantName?.trim() || data?.tenantName?.trim() || PROJECT_INFO.NAME;
  const byline =
    resolvedBranding?.byline?.trim() ||
    data?.tenantName?.trim() ||
    `${assistantName} assistant`;
  const logoUrl = resolvedBranding?.logoUrl?.trim();
  const logoAlt = resolvedBranding?.logoAlt?.trim() || assistantName;

  useEffect(() => {
    if (!token) {
      setStatus('404');
      return;
    }
    void (async () => {
      resolveOscaConfig();
      await hydrateOscaTenantProject();
      fetch(`${window.oscaConfig.httpUrl}/api/chat/share/token/${token}`, { headers: oscaTenantHeaders() })
        .then((res) => {
          if (res.status === 404) {
            setStatus('404');
            return;
          }
          if (res.status === 410) {
            setStatus('410');
            return;
          }
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then((json) => {
          if (json) {
            setData(json);
            setStatus('success');
          }
        })
        .catch(() => setStatus('404'));
    })();
  }, [token]);

  useEffect(() => {
    // Always apply the branding that came with the shared tenant.
    if (!data?.publicBranding) return;
    applyTenantBrandingCss(data.publicBranding);
    window.oscaTenantUi = {
      ...(window.oscaTenantUi ?? {}),
      branding: data.publicBranding,
    };
    bumpTenantUiRevision();
  }, [data?.publicBranding]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[color:var(--osca-bg-light)] dark:bg-[color:var(--osca-bg-dark)] flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_85%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_85%,transparent)] p-6 text-center shadow-lg">
          <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--osca-accent)] border-t-transparent" />
          <p className="text-sm text-gray-700 dark:text-gray-300">Loading shared conversation…</p>
        </div>
      </div>
    );
  }

  if (status === '404') {
    return (
      <div className="min-h-screen bg-[color:var(--osca-bg-light)] dark:bg-[color:var(--osca-bg-dark)] flex items-center justify-center p-8">
        <div className="w-full max-w-lg rounded-2xl border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_88%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_88%,transparent)] p-8 text-center shadow-xl">
          <p className="text-xl font-semibold text-gray-900 dark:text-[color:var(--osca-text-on-dark)]">This link is invalid or has been removed.</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">The shared token may be incorrect, deleted, or from another environment.</p>
          <Link to="/" className="mt-5 inline-flex text-[color:var(--osca-accent)] hover:underline">Start your own conversation →</Link>
        </div>
      </div>
    );
  }

  if (status === '410') {
    return (
      <div className="min-h-screen bg-[color:var(--osca-bg-light)] dark:bg-[color:var(--osca-bg-dark)] flex items-center justify-center p-8">
        <div className="w-full max-w-lg rounded-2xl border border-[color:var(--osca-border-light)] dark:border-[color:var(--osca-border-dark)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_88%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_88%,transparent)] p-8 text-center shadow-xl">
          <p className="text-xl font-semibold text-gray-900 dark:text-[color:var(--osca-text-on-dark)]">This shared link has expired.</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Shared links are time-limited for privacy and security.</p>
          <Link to="/" className="mt-5 inline-flex text-[color:var(--osca-accent)] hover:underline">Start your own conversation →</Link>
        </div>
      </div>
    );
  }

  const bannerText = data?.type === 'full'
    ? "You're viewing a shared conversation."
    : "You're viewing a shared thread.";

  return (
    <div className="min-h-screen bg-[color:var(--osca-bg-light)] dark:bg-[color:var(--osca-bg-dark)] flex flex-col">
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-[color:var(--osca-surface-dark-hover)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_92%,transparent)] backdrop-blur-md dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_92%,transparent)]">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-8 w-auto max-w-[120px] rounded-md object-contain" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--osca-accent)] text-sm font-bold text-white">
                {assistantName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900 dark:text-[color:var(--osca-text-on-dark)]">{assistantName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{byline}</p>
            </div>
          </div>
          <span className="rounded-full border border-[color:color-mix(in_srgb,var(--osca-accent)_30%,transparent)] bg-[color:color-mix(in_srgb,var(--osca-accent)_10%,transparent)] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[color:var(--osca-accent)]">
            Shared view
          </span>
        </div>
      </header>

      <div className="border-b border-gray-200 bg-gray-100/70 px-4 py-2 text-center text-sm text-gray-600 dark:border-[color:var(--osca-surface-dark-hover)] dark:bg-[color:color-mix(in_srgb,var(--osca-surface-dark)_80%,transparent)] dark:text-gray-400">
        {bannerText}
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-4 px-4 py-6 pb-28">
        {data?.messages.map((msg) => (
          <div
            key={msg.id || msg.timestamp + msg.type}
            className={`overflow-hidden rounded-2xl border shadow-sm ${msg.type === 'user'
              ? 'ml-auto max-w-[90%] border-[color:color-mix(in_srgb,var(--osca-accent)_45%,var(--osca-border-light))] bg-[color:color-mix(in_srgb,var(--osca-accent)_7%,var(--osca-bg-light))] dark:border-[color:color-mix(in_srgb,var(--osca-accent)_40%,var(--osca-border-dark))] dark:bg-[color:color-mix(in_srgb,var(--osca-accent)_10%,var(--osca-bg-dark))]'
              : 'border-[color:var(--osca-border-light)] bg-[color:var(--osca-bg-light)] dark:border-[color:var(--osca-border-dark)] dark:bg-[color:var(--osca-bg-dark)]'
              }`}
          >
            <div className="px-5 py-4 sm:px-6 sm:py-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--osca-accent)]">
                {msg.type === 'user' ? 'You' : assistantName}
              </div>

              {msg.type === 'user' ? (
                <div className="text-gray-800 dark:text-[color:var(--osca-text-on-dark)] whitespace-pre-wrap">{msg.text}</div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      a: ({ ...props }) => (
                        <a
                          {...props}
                          className="text-[color:var(--osca-accent)] hover:text-[color:var(--osca-accent)] dark:text-[color:var(--osca-accent)]"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      ul: ({ ...props }) => <ul {...props} className="my-4 ml-4 list-disc dark:text-white" />,
                      li: ({ ...props }) => <li {...props} className="text-slate-700 dark:!text-gray-100" />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}
              {msg.referenceSources && msg.referenceSources.length > 0 && (
                <ReferenceSources sources={msg.referenceSources} />
              )}
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-[color:color-mix(in_srgb,var(--osca-bg-light)_94%,transparent)] p-4 backdrop-blur-md dark:border-[color:var(--osca-surface-dark-hover)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_94%,transparent)]">
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--osca-accent)] px-6 py-3 font-medium text-white transition-all hover:brightness-110"
          >
            Start your own conversation →
          </Link>
        </div>
      </div>
    </div>
  );
}
