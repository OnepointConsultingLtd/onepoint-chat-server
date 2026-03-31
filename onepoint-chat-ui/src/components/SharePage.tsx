import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PROJECT_INFO } from '../lib/constants';
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
};

export default function SharePage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | '404' | '410'>('loading');
  const [data, setData] = useState<ShareData | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus('404');
      return;
    }
    fetch(`${window.oscaConfig?.httpUrl || ''}/api/chat/share/token/${token}`)
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
  }, [token]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#fafffe] dark:bg-[#1F1925] flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (status === '404') {
    return (
      <div className="min-h-screen bg-[#fafffe] dark:bg-[#1F1925] flex flex-col items-center justify-center p-8">
        <p className="text-gray-700 dark:text-gray-300 text-lg">This link is invalid or has been removed.</p>
        <Link to="/" className="mt-4 text-[#9a19ff] hover:underline">Start your own conversation →</Link>
      </div>
    );
  }

  if (status === '410') {
    return (
      <div className="min-h-screen bg-[#fafffe] dark:bg-[#1F1925] flex flex-col items-center justify-center p-8">
        <p className="text-gray-700 dark:text-gray-300 text-lg">This shared link has expired.</p>
        <Link to="/" className="mt-4 text-[#9a19ff] hover:underline">Start your own conversation →</Link>
      </div>
    );
  }

  const bannerText = data?.type === 'full'
    ? "You're viewing a shared Osca conversation."
    : "You're viewing a shared Osca thread.";

  return (
    <div className="min-h-screen bg-[#fafffe] dark:bg-[#1F1925] flex flex-col">
      <header className="px-6 py-4 border-b border-gray-200 dark:border-[#352840]">
        <div className="flex items-center gap-2 justify-center">
          <span className="text-lg font-semibold text-gray-800 dark:text-[#fafffe]">{PROJECT_INFO.NAME}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{PROJECT_INFO.NAME_DESCRIPTION}</span>
        </div>
      </header>

      <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100/80 dark:bg-[#2a1f35]/80 border-b border-gray-200 dark:border-[#352840] text-center">
        {bannerText}
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full py-6 px-4 space-y-6">
        {data?.messages.map((msg) => (
          <div
            key={msg.id || msg.timestamp + msg.type}
            className="rounded-xl overflow-hidden border border-[#636565] dark:border-[#fafffe] bg-[#fafffe] dark:bg-[#1F1925]"
          >
            <div className="px-6 py-5">

              {msg.type === 'user' ? (
                <div className="text-gray-800 dark:text-[#fafffe] whitespace-pre-wrap">{msg.text}</div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      a: ({ ...props }) => (
                        <a
                          {...props}
                          className="text-[#9a19ff] hover:text-[#9a19ff] dark:text-[#9a19ff]"
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

      <div className="p-6 border-t border-gray-200 dark:border-[#352840] flex justify-center fixed bottom-0 left-0 right-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9a19ff] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Start your own conversation →
        </Link>
      </div>
    </div>
  );
}
