import type { ReactNode } from 'react'

function Section({
	title,
	children,
}: {
	title: string
	children: ReactNode
}) {
	return (
		<section className="mb-10">
			<h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
			<div className="text-sm text-gray-600 space-y-3 leading-relaxed">{children}</div>
		</section>
	)
}

function Code({ children }: { children: ReactNode }) {
	return (
		<code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-800">{children}</code>
	)
}

function Pre({ children }: { children: string }) {
	return (
		<pre className="mt-2 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs font-mono text-gray-800 leading-relaxed">
			{children}
		</pre>
	)
}

export default function Documentation() {
	return (
		<div className="max-w-3xl">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-gray-900">Documentation</h1>
				<p className="text-sm text-gray-500 mt-1">
					How multi-tenant OSCA fits together: registry, this app, the chat UI, and the API server.
				</p>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
				<Section title="What this app is">
					<p>
						The <strong>Osca configurator</strong> is an admin UI for managing <strong>client</strong> records in MongoDB’s{' '}
						<Code>osca-registry</Code> database. Each client row defines one tenant: token, domains, LLM settings, prompt
						text, and which Mongo database holds that tenant’s chats (<Code>conversations</Code>, <Code>shares</Code>).
					</p>
					<p>
						This app talks to the OSCA Node server over <strong>REST</strong> using the <Code>/admin/clients</Code> routes
						and the <Code>x-admin-secret</Code> header (same value as <Code>ADMIN_SECRET</Code> on the server). Without that
						env, the UI shows <strong>demo data only</strong> and nothing is written to Mongo.
					</p>
				</Section>

				<Section title="Architecture (high level)">
					<ul className="list-disc pl-5 space-y-2">
						<li>
							<strong>osca-registry</strong> — one global database; collection <Code>clients</Code> is the source of truth
							for tenant config.
						</li>
						<li>
							<strong>Per-tenant DBs</strong> — each client has a <Code>dbName</Code> (e.g. <Code>acme-agent-db</Code>).
							Chats and shares live there, not in the registry.
						</li>
						<li>
							<strong>OSCA Node server</strong> (repo root) — connects to the registry, resolves the tenant on each
							request using the <Code>X-Osca-Token</Code> header (registry widget token), then uses that client’s <Code>dbName</Code> for data and{' '}
							<Code>provider</Code> / <Code>model</Code> / <Code>prompt</Code> for the LLM and RAG context.
						</li>
						<li>
							<strong>onepoint-chat-ui</strong> — the end-user chat. It sends <Code>X-Osca-Token</Code> (and WebSocket{' '}
							<Code>?token=</Code>) so the server knows which registry row to use.
						</li>
						<li>
							<strong>This configurator</strong> — creates/updates/deletes registry rows and provisions tenant DB
							collections; it does not host the chat.
						</li>
					</ul>
				</Section>

				<Section title="Environment variables (this app)">
					<p>
						Create <Code>osca-configurator/.env</Code> (see <Code>.env.example</Code>):
					</p>
					<Pre>{`VITE_OSCA_API_URL=http://localhost:5000
VITE_OSCA_ADMIN_SECRET=<same value as ADMIN_SECRET in repo root .env>`}</Pre>
					<p>
						Restart the Vite dev server after changes. When the green banner appears on <strong>Clients</strong>, the list
						is loaded from the real registry.
					</p>
					<p className="mt-4">
						Embed snippet defaults (Widget builder → Token &amp; embed) — optional in <Code>.env</Code>:
					</p>
					<Pre>{`# VITE_EMBED_SNIPPET_HTTP_URL=https://api.example.com
# VITE_EMBED_SNIPPET_WS_URL=wss://ws.example.com
# VITE_EMBED_SNIPPET_WIDGET_SCRIPT_URL=https://chat.example.com/widget.iife.js`}</Pre>
				</Section>

				<Section title="Registry client fields (what you edit here)">
					<ul className="list-disc pl-5 space-y-2">
						<li>
							<Code>name</Code> — display label.
						</li>
						<li>
							<Code>projectName</Code> — slug; also used as the LightRAG / context API <Code>project=</Code> parameter
							when the chat server builds the context URL.
						</li>
						<li>
							<Code>dbName</Code> — Mongo database name for this tenant (must be unique).
						</li>
						<li>
							<Code>token</Code> — secret the widget sends; maps to <Code>osca-registry.clients.token</Code> (unique).
						</li>
						<li>
							<Code>domains</Code> — allowed browser origins (e.g. <Code>localhost:5173</Code>) for CORS and WebSocket.
						</li>
						<li>
							<Code>provider</Code> / <Code>model</Code> — LLM routing for that tenant.
						</li>
						<li>
							<Code>prompt</Code> — TOML string (persona, welcome, etc.), same idea as the old single-tenant prompt file.
						</li>
						<li>
							<Code>active</Code> — if false, the API rejects that token.
						</li>
					</ul>
				</Section>

				<Section title="Embed snippet (Widget builder → Token &amp; embed)">
					<p>
						The generated HTML sets <Code>window.__OSCA_CONFIG__</Code> with <Code>httpUrl</Code>,{' '}
						<Code>websocketUrl</Code>, and this client’s <Code>clientToken</Code>. Those two URLs are the{' '}
						<strong>same OSCA application</strong>: REST (chat history, conversations, shares) vs WebSocket (streaming
						replies). They are <strong>not</strong> the LightRAG / context service — that uses <Code>CONTEXT_API_URL</Code> /{' '}
						<Code>CONTEXT_API_KEY</Code> only on the <strong>server</strong> (repo root <Code>.env</Code>), never in the
						browser embed.
					</p>
					<p>
						Placeholder values in the copied snippet come from <Code>VITE_EMBED_SNIPPET_HTTP_URL</Code>,{' '}
						<Code>VITE_EMBED_SNIPPET_WS_URL</Code>, and <Code>VITE_EMBED_SNIPPET_WIDGET_SCRIPT_URL</Code> (URL of the hosted{' '}
						<Code>widget.iife.js</Code>) in <Code>osca-configurator/.env</Code> (restart Vite).
					</p>
				</Section>

				<Section title="Chat UI (onepoint-chat-ui) vs this app">
					<p>
						The <strong>chat UI</strong> does not use <Code>ADMIN_SECRET</Code>. It only needs the{' '}
						<strong>widget token</strong> that matches a row in <Code>clients</Code>, plus URLs for REST and WebSocket.
					</p>
					<p>In <Code>onepoint-chat-ui/.env</Code> you can set:</p>
					<Pre>{`VITE_OSCA_HTTP_URL=http://localhost:5000
VITE_OSCA_WS_URL=ws://localhost:4000
VITE_OSCA_CLIENT_TOKEN=<widget token for the tenant you want>`}</Pre>
					<p>
						If <Code>VITE_OSCA_CLIENT_TOKEN</Code> is omitted, the app falls back to <Code>ONE_TIME_TOKEN</Code> in{' '}
						<Code>constants.ts</Code> (must match a registry <Code>token</Code> for local dev).
					</p>
				</Section>

				<Section title="Switching between two clients (local dev)">
					<p>Each client has its own <Code>token</Code>. To point the chat at another tenant:</p>
					<ul className="list-disc pl-5 space-y-2">
						<li>
							<strong>Quick:</strong> add query <Code>?oscaToken=…</Code> to the chat app URL (paste the widget token;
							bookmark one URL per client).
						</li>
						<li>
							<strong>Stable default:</strong> set <Code>VITE_OSCA_CLIENT_TOKEN</Code> in <Code>onepoint-chat-ui/.env</Code>{' '}
							and restart Vite.
						</li>
					</ul>
					<p>
						Ensure each client’s <Code>domains</Code> include <Code>localhost:5173</Code> (and{' '}
						<Code>127.0.0.1:5173</Code> if you use that host).
					</p>
				</Section>

				<Section title="Server (repo root .env)">
					<p>Typical entries the OSCA process needs:</p>
					<ul className="list-disc pl-5 space-y-2">
						<li>
							<Code>MONGO_URI</Code>, <Code>MONGO_REGISTRY_DB=osca-registry</Code>
						</li>
						<li>
							<Code>REST_API_PORT</Code> (often 5000), <Code>PORT</Code> for WebSocket (often 4000)
						</li>
						<li>
							<Code>ADMIN_SECRET</Code> — protects <Code>/admin/*</Code>; must match <Code>VITE_OSCA_ADMIN_SECRET</Code> here.
						</li>
						<li>
							<Code>CONTEXT_API_URL</Code> / <Code>CONTEXT_API_KEY</Code> — RAG/context service; <Code>project=</Code> is
							set per request from the active client’s <Code>projectName</Code>.
						</li>
						<li>
							Provider API keys (<Code>OPENAI_API_KEY</Code>, etc.) — usually one set on the server for all tenants unless
							you add per-client keys later.
						</li>
					</ul>
				</Section>

				<Section title="Workflow: create a new client">
					<ol className="list-decimal pl-5 space-y-2">
						<li>Run MongoDB and the OSCA Node server with registry access.</li>
						<li>
							Set <Code>VITE_OSCA_ADMIN_SECRET</Code> in this app and restart Vite.
						</li>
						<li>
							Go to <strong>Clients</strong> → <strong>New client</strong>.
						</li>
						<li>
							Fill <strong>Mongo DB name</strong> (unique), domains, prompt, provider/model, then <strong>Save client</strong>.
						</li>
						<li>
							Copy the <strong>widget token</strong> from <strong>Widget builder</strong> → Token &amp; embed into the chat
							UI env or <Code>?oscaToken=</Code>.
						</li>
					</ol>
				</Section>

				<Section title="Troubleshooting">
					<ul className="list-disc pl-5 space-y-2">
						<li>
							<strong>Demo data banner</strong> — set <Code>VITE_OSCA_ADMIN_SECRET</Code> and reload; check server is up
							and URL matches <Code>VITE_OSCA_API_URL</Code>.
						</li>
						<li>
							<strong>Chat 401 / WebSocket fails</strong> — token must match <Code>clients.token</Code>; origin must be in{' '}
							<Code>domains</Code>.
						</li>
						<li>
							<strong>CORS</strong> — registry domains drive allowed origins for tenant APIs; in development the server may
							also allow localhost origins for tooling.
						</li>
					</ul>
				</Section>
			</div>
		</div>
	)
}
