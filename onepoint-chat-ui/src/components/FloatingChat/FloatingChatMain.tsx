import { useShallow } from 'zustand/react/shallow';
import { useTenantBranding } from '../../hooks/useTenantBranding';
import { interceptServerError } from '../../lib/interceptServerError';
import useChatStore from '../../store/chatStore';
import ChatInput from '../ChatInput';
import ErrorCard from '../flow/ErrorCard';
import Messages from '../Messages';
import FloatingHeader from './FloatingHeader';

type FloatingChatMainProps = {
  handleSubmit: (text: string) => void;
  sendMessageToServer: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

const capabilities = [
  {
    title: 'Data Strategy & Governance',
    desc: 'Data Wellness assessments, architecture planning, and D-Well / D-Wise guidance.',
    iconColor: 'var(--osca-accent-secondary)',
    iconBg: 'color-mix(in srgb, var(--osca-accent) 12%, transparent)',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    title: 'AI Innovation & Build',
    desc: 'AI strategy, proofs of value, and enterprise AI implementation with the Onepoint AI Engine.',
    iconColor: '#34D399',
    iconBg: 'rgba(29,158,117,0.1)',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: 'Enterprise Architecture',
    desc: 'Solution design, integration patterns, cloud migration, and Architect for Outcomes methodology.',
    iconColor: '#60A5FA',
    iconBg: 'rgba(56,130,221,0.1)',
    icon: (
      <>
        <rect x="2" y="3" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="3" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="14" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="14" width="7" height="7" rx="1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Services & Team',
    desc: "Learn about Onepoint's offerings, Springboard workshops, and how to engage our team.",
    iconColor: '#FB923C',
    iconBg: 'rgba(251,146,60,0.1)',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

export default function FloatingChatMain({
  handleSubmit,
  sendMessageToServer,
  messagesEndRef,
}: FloatingChatMainProps) {
  const { isFloatingOpen, toggleFloatingChat, messages } = useChatStore(
    useShallow(state => ({
      isFloatingOpen: state.isFloatingOpen,
      toggleFloatingChat: state.toggleFloatingChat,
      messages: state.messages,
    }))
  );

  const isError = interceptServerError(messages);
  const branding = useTenantBranding();
  const assistantName = branding?.assistantName?.trim() || 'OSCA';
  const byline = branding?.byline?.trim() || 'by Onepoint';
  const roleBadge = branding?.assistantBadge?.trim() || 'AI Advisor';
  const heroEyebrow = branding?.heroEyebrow?.trim() || 'Onepoint AI Ecosystem';
  const heroTitleCustom = branding?.heroTitle?.trim();
  const heroSubtitle =
    branding?.heroSubtitle?.trim() ||
    "Expert guidance on data strategy, AI innovation, and enterprise architecture — grounded in Onepoint's verified knowledge base.";
  const logoUrl = branding?.logoUrl?.trim();
  const logoAlt = branding?.logoAlt?.trim() || assistantName;

  return (
    <>
      {/* ── LANDING PAGE ─────────────────────────────────────────────── */}
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: 'var(--osca-landing-bg)',
          color: 'var(--osca-text-on-dark)',
          fontFamily: 'var(--osca-font-sans)',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(color-mix(in srgb, var(--osca-accent) 4.5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--osca-accent) 4.5%, transparent) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '500px',
            height: '340px',
            background:
              'radial-gradient(ellipse, color-mix(in srgb, var(--osca-accent) 20%, transparent) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-sm mx-auto px-5 pb-16">

          {/* ── Header ── */}
          <div className="flex items-center justify-between pt-6 pb-1">
            <div className="flex items-center gap-2.5">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="h-8 w-auto max-w-[120px] object-contain flex-shrink-0 rounded-lg"
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--osca-accent) 0%, color-mix(in srgb, var(--osca-accent) 55%, #000) 100%)',
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                  </svg>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold leading-none tracking-wide" style={{ color: 'var(--osca-text-on-dark)' }}>
                  {assistantName}
                </p>
                <p className="text-[10px] leading-none mt-1 tracking-widest uppercase" style={{ color: 'var(--osca-text-muted)' }}>
                  {byline}
                </p>
              </div>
            </div>
            <span
              className="text-[11px] px-3 py-1 rounded-full"
              style={{
                color: 'var(--osca-accent)',
                border: '1px solid color-mix(in srgb, var(--osca-accent) 35%, transparent)',
                letterSpacing: '0.04em',
              }}
            >
              {roleBadge}
            </span>
          </div>

          {/* ── Hero ── */}
          <div className="text-center pt-12 pb-10">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                color: 'var(--osca-accent)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span className="w-1 h-1 rounded-full block" style={{ background: 'var(--osca-accent)' }} />
              {heroEyebrow}
              <span className="w-1 h-1 rounded-full block" style={{ background: 'var(--osca-accent)' }} />
            </div>

            {/* H1 */}
            {heroTitleCustom ? (
              <h1
                className="mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--osca-font-display)',
                  fontSize: '36px',
                  color: 'var(--osca-text-on-dark)',
                  letterSpacing: '-0.01em',
                }}
              >
                {heroTitleCustom}
              </h1>
            ) : (
              <h1
                className="mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--osca-font-display)',
                  fontSize: '36px',
                  color: 'var(--osca-text-on-dark)',
                  letterSpacing: '-0.01em',
                }}
              >
                Your{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--osca-accent-secondary)' }}>intelligent</em>
                <br />
                Onepoint advisor
              </h1>
            )}

            {/* Subtitle */}
            <p
              className="mb-9 leading-relaxed mx-auto"
              style={{ fontSize: '14px', color: 'var(--osca-text-muted)', maxWidth: '300px' }}
            >
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mx-auto" style={{ maxWidth: '260px' }}>
              <button
                onClick={toggleFloatingChat}
                className="flex items-center justify-center gap-2 w-full rounded-xl font-medium transition-opacity active:opacity-80"
                style={{
                  background: 'var(--osca-accent)',
                  color: '#fff',
                  padding: '13px 20px',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Start a conversation
              </button>

              <a
                href="https://www.onepointltd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl transition-opacity active:opacity-70"
                style={{
                  color: 'var(--osca-text-muted)',
                  padding: '12px 20px',
                  fontSize: '14px',
                  border: '1px solid rgba(255,255,255,0.09)',
                  textDecoration: 'none',
                  background: 'transparent',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Visit onepointltd.com
              </a>
            </div>
          </div>


          {/* ── Divider ── */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span
              style={{
                fontSize: '10px',
                color: 'var(--osca-text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              What Osca helps with
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* ── Capability cards ── */}
          <div className="flex flex-col gap-2.5 mb-10">
            {capabilities.map(({ title, desc, iconColor, iconBg, icon }) => (
              <div
                key={title}
                className="flex items-start gap-3.5 rounded-xl p-4 transition-all border border-[color:rgba(255,255,255,0.07)] hover:border-[color:color-mix(in_srgb,var(--osca-accent)_30%,transparent)]"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                }}
              >
                <div
                  className="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center"
                  style={{ background: iconBg }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={iconColor}
                  >
                    {icon}
                  </svg>
                </div>
                <div>
                  <p className="font-medium mb-0.5" style={{ fontSize: '13px', color: 'var(--osca-text-on-dark)' }}>
                    {title}
                  </p>
                  <p className="leading-relaxed" style={{ fontSize: '12px', color: 'var(--osca-text-muted)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Trust box ── */}
          <div
            className="flex items-start gap-3 rounded-xl p-4 mb-10"
            style={{
              background: 'color-mix(in srgb, var(--osca-accent) 5%, transparent)',
              border: '1px solid color-mix(in srgb, var(--osca-accent) 18%, transparent)',
            }}
          >
            <div
              className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center"
              style={{ background: 'color-mix(in srgb, var(--osca-accent) 15%, transparent)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--osca-accent-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="font-medium mb-0.5" style={{ fontSize: '12px', color: 'var(--osca-accent-secondary)' }}>
                Grounded in verified knowledge
              </p>
              <p className="leading-relaxed" style={{ fontSize: '11px', color: 'var(--osca-text-muted)' }}>
                Osca only uses information from Onepoint's knowledge base. It will never fabricate services, prices, or capabilities.
              </p>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="text-center" style={{ fontSize: '11px', color: 'var(--osca-text-muted)', lineHeight: 1.8 }}>
            <p>Built on the Onepoint AI Engine</p>
            <p>
              <a
                href="https://www.onepointltd.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--osca-accent-secondary)', textDecoration: 'none' }}
              >
                onepointltd.com
              </a>
              {' · '}
              contact@onepointltd.com
            </p>
          </div>

        </div>
      </div>

      {/* ── CHAT OVERLAY ─────────────────────────────────────────────── */}
      {isFloatingOpen && (
        <div className="fixed inset-0 z-50 flex min-h-0 flex-col bg-[color:var(--osca-bg-light)] dark:bg-[color:var(--osca-bg-dark)]">
          <FloatingHeader />

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[color:var(--osca-bg-light)] dark:bg-[color:var(--osca-bg-dark)]">
            {isError ? (
              <div className="flex h-full items-center justify-center p-6">
                <ErrorCard
                  title="Connection Error"
                  message="We were unable to connect to the server. Please check your internet connection or try again later."
                />
              </div>
            ) : (
              <Messages
                messagesEndRef={messagesEndRef}
                sendMessageToServer={sendMessageToServer}
              />
            )}
          </div>

          <div className="shrink-0 border-t border-gray-200 bg-[color:var(--osca-bg-light)] pb-[env(safe-area-inset-bottom)] dark:border-gray-700 dark:bg-[color:var(--osca-bg-dark)]">
            <ChatInput handleSubmit={handleSubmit} embedded />
          </div>
        </div>
      )}
    </>
  );
}