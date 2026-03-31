import { useShallow } from 'zustand/react/shallow';
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
    iconColor: '#C084FC',
    iconBg: 'rgba(154,25,255,0.12)',
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

  return (
    <>
      {/* ── LANDING PAGE ─────────────────────────────────────────────── */}
      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: '#0D0A14', color: '#F0EDF6' }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(154,25,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(154,25,255,0.045) 1px, transparent 1px)',
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
            background: 'radial-gradient(ellipse, rgba(154,25,255,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-sm mx-auto px-5 pb-16">

          {/* ── Header ── */}
          <div className="flex items-center justify-between pt-6 pb-1">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #9a19ff 0%, #5b0ea6 100%)' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold leading-none tracking-wide" style={{ color: '#F0EDF6' }}>
                  OSCA
                </p>
                <p className="text-[10px] leading-none mt-1 tracking-widest uppercase" style={{ color: '#6B5F80' }}>
                  by Onepoint
                </p>
              </div>
            </div>
            <span
              className="text-[11px] px-3 py-1 rounded-full"
              style={{
                color: '#9a19ff',
                border: '1px solid rgba(154,25,255,0.35)',
                letterSpacing: '0.04em',
              }}
            >
              AI Advisor
            </span>
          </div>

          {/* ── Hero ── */}
          <div className="text-center pt-12 pb-10">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{ color: '#9a19ff', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              <span className="w-1 h-1 rounded-full block" style={{ background: '#9a19ff' }} />
              Onepoint AI Ecosystem
              <span className="w-1 h-1 rounded-full block" style={{ background: '#9a19ff' }} />
            </div>

            {/* H1 */}
            <h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontSize: '36px',
                color: '#F0EDF6',
                letterSpacing: '-0.01em',
              }}
            >
              Your{' '}
              <em style={{ fontStyle: 'italic', color: '#C084FC' }}>intelligent</em>
              <br />
              Onepoint advisor
            </h1>

            {/* Subtitle */}
            <p
              className="mb-9 leading-relaxed mx-auto"
              style={{ fontSize: '14px', color: '#7B6A90', maxWidth: '300px' }}
            >
              Expert guidance on data strategy, AI innovation, and enterprise architecture —
              grounded in Onepoint's verified knowledge base.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mx-auto" style={{ maxWidth: '260px' }}>
              <button
                onClick={toggleFloatingChat}
                className="flex items-center justify-center gap-2 w-full rounded-xl font-medium transition-opacity active:opacity-80"
                style={{
                  background: '#9a19ff',
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
                  color: '#9B8FB0',
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
                color: '#4A3F5C',
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
                className="flex items-start gap-3.5 rounded-xl p-4 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(154,25,255,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
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
                  <p className="font-medium mb-0.5" style={{ fontSize: '13px', color: '#E2DAF0' }}>
                    {title}
                  </p>
                  <p className="leading-relaxed" style={{ fontSize: '12px', color: '#5E5272' }}>
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
              background: 'rgba(154,25,255,0.05)',
              border: '1px solid rgba(154,25,255,0.18)',
            }}
          >
            <div
              className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(154,25,255,0.15)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="font-medium mb-0.5" style={{ fontSize: '12px', color: '#C084FC' }}>
                Grounded in verified knowledge
              </p>
              <p className="leading-relaxed" style={{ fontSize: '11px', color: '#6B5F80' }}>
                Osca only uses information from Onepoint's knowledge base. It will never fabricate services, prices, or capabilities.
              </p>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="text-center" style={{ fontSize: '11px', color: '#38304A', lineHeight: 1.8 }}>
            <p>Built on the Onepoint AI Engine</p>
            <p>
              <a
                href="https://www.onepointltd.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5E4880', textDecoration: 'none' }}
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
        <div className="fixed inset-0 z-50 flex min-h-0 flex-col bg-[#fafffe] dark:!bg-[#1F1925]">
          <FloatingHeader />

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fafffe] dark:!bg-[#1F1925]">
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

          <div className="shrink-0 border-t border-gray-200 bg-[#fafffe] pb-[env(safe-area-inset-bottom)] dark:border-gray-700 dark:!bg-[#1F1925]">
            <ChatInput handleSubmit={handleSubmit} embedded />
          </div>
        </div>
      )}
    </>
  );
}