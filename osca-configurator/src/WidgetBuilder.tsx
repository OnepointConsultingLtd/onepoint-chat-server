import { useState } from 'react'
import type { Client, LLMProvider, PredefinedQuickQuestion, TenantPublicTheme } from './Types';
import { emptyPublicBranding } from './Types';
import { useClientStore } from './store/clientStore';
import { useToast } from './hooks/useToast';
import { isRegistryApiConfigured, regenRegistryToken } from './lib/oscaAdminApi';

function generateToken() {
	const hex = () => Math.floor(Math.random() * 16).toString(16)
	return 'osca_live_' + Array.from({ length: 32 }, hex).join('')
}

function isPublicBrandingConfigured(b: Client['publicBranding']): boolean {
	const s = (x: string) => x.trim().length > 0
	for (const [k, v] of Object.entries(b)) {
		if (k === 'theme' || typeof v !== 'string') continue
		if (s(v)) return true
	}
	return Object.values(b.theme).some((v) => s(v))
}

function parseQuickQuestionsJson(
	raw: string,
): { ok: true; value: PredefinedQuickQuestion[] } | { ok: false; error: string } {
	const trimmed = raw.trim()
	if (!trimmed) return { ok: true, value: [] }
	try {
		const parsed = JSON.parse(trimmed) as unknown
		if (!Array.isArray(parsed)) return { ok: false, error: 'Must be a JSON array' }
		const out: PredefinedQuickQuestion[] = []
		for (let i = 0; i < parsed.length; i++) {
			const item = parsed[i]
			if (!item || typeof item !== 'object')
				return { ok: false, error: `Item ${i + 1}: expected an object` }
			const o = item as Record<string, unknown>
			const id = typeof o.id === 'number' ? o.id : Number(o.id)
			const text = typeof o.text === 'string' ? o.text : ''
			if (!Number.isFinite(id)) return { ok: false, error: `Item ${i + 1}: id must be a number` }
			if (!text.trim()) return { ok: false, error: `Item ${i + 1}: text is required` }
			const label = typeof o.label === 'string' && o.label.trim() ? o.label : undefined
			out.push({ id, text, ...(label ? { label } : {}) })
		}
		return { ok: true, value: out }
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : 'Invalid JSON' }
	}
}

const modelsByProvider: Record<LLMProvider, string[]> = {
	openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
	claude: ['claude-opus-4-6', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'],
	gemini: ['gemini-pro', 'gemini-1.5-pro', 'gemini-flash'],
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
	return (
		<div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm shadow-lg text-white ${type === 'success' ? 'bg-emerald-600' : 'bg-red-500'
			}`}>
			<span>{type === 'success' ? '✓' : '✕'}</span>
			{message}
		</div>
	)
}

type WidgetBuilderFormProps = {
	initialClient: Client
	isNew: boolean
}

function WidgetBuilderForm({ initialClient, isNew }: WidgetBuilderFormProps) {
	const { saveClient, setSelected } = useClientStore()
	const { toasts, addToast } = useToast()
	const [form, setForm] = useState<Client>(() => ({
		...initialClient,
		publicBranding: initialClient.publicBranding ?? emptyPublicBranding(),
	}))
	const [quickQuestionsJson, setQuickQuestionsJson] = useState(() =>
		JSON.stringify(initialClient.predefinedQuickQuestions ?? [], null, 2),
	)
	const [newDomain, setNewDomain] = useState('')
	const [copied, setCopied] = useState<string | null>(null)
	const [tab, setTab] = useState<'config' | 'prompt' | 'branding' | 'token'>('config')

	const embedHttpUrl =
		(import.meta.env.VITE_EMBED_SNIPPET_HTTP_URL as string | undefined)?.trim() || 'https://api.yourdomain.com'
	const embedWsUrl =
		(import.meta.env.VITE_EMBED_SNIPPET_WS_URL as string | undefined)?.trim() || 'wss://ws.yourdomain.com'
	const embedScriptUrl =
		(import.meta.env.VITE_EMBED_SNIPPET_WIDGET_SCRIPT_URL as string | undefined)?.trim() ||
		'https://cdn.osca.ai/widget.js'

	// OscaChatConfig: clientToken → X-Osca-Token; projectName → LightRAG / related_topics slug (registry field).
	const snippet = `<script>
  window.__OSCA_CONFIG__ = {
    httpUrl: ${JSON.stringify(embedHttpUrl)},
    websocketUrl: ${JSON.stringify(embedWsUrl)},
    clientToken: ${JSON.stringify(form.token)},
    projectName: ${JSON.stringify(form.projectName)},
  };
</script>
<script src=${JSON.stringify(embedScriptUrl)}></script>`

	function copy(text: string, key: string) {
		navigator.clipboard.writeText(text).catch(() => { })
		setCopied(key)
		setTimeout(() => setCopied(null), 2000)
	}

	function addDomain() {
		const val = newDomain.trim()
		if (!val || form.domains.includes(val)) return
		setForm((f) => ({ ...f, domains: [...f.domains, val] }))
		setNewDomain('')
	}

	function removeDomain(d: string) {
		setForm((f) => ({ ...f, domains: f.domains.filter((x) => x !== d) }))
	}

	async function handleSave() {
		if (!form.name?.trim() || !form.projectName?.trim() || !form.dbName?.trim()) {
			addToast('Name, project name, and Mongo DB name are required', 'error')
			return
		}
		const parsedQs = parseQuickQuestionsJson(quickQuestionsJson)
		if (!parsedQs.ok) {
			addToast(`Quick questions JSON: ${parsedQs.error}`, 'error')
			return
		}
		try {
			await saveClient(
				{ ...form, predefinedQuickQuestions: parsedQs.value },
				isNew,
			)
			setForm((f) => ({ ...f, predefinedQuickQuestions: parsedQs.value }))
			setQuickQuestionsJson(JSON.stringify(parsedQs.value, null, 2))
			addToast('Client saved successfully')
		} catch (e) {
			addToast(e instanceof Error ? e.message : String(e), 'error')
		}
	}

	return (
		<div>
			<div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
				{toasts.map((t) => <Toast key={t.id} message={t.message} type={t.type} />)}
			</div>

			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-xl font-semibold text-gray-900">
						{isNew ? 'New client' : form.name}
					</h1>
					{!isNew && <p className="text-sm text-gray-400 font-mono mt-0.5">{form.projectName}</p>}
				</div>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setSelected(null)}
						className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={() => void handleSave()}
						className="text-sm px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
					>
						Save client
					</button>
				</div>
			</div>

			{/* Sub-tabs */}
			<div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
				{(['config', 'prompt', 'branding', 'token'] as const).map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => setTab(t)}
						className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
							}`}
					>
						{t === 'token' ? 'Token & embed' : t === 'branding' ? 'Branding' : t}
					</button>
				))}
			</div>

			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2 space-y-5">

					{/* CONFIG */}
					{tab === 'config' && (
						<>
							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<h2 className="text-sm font-semibold text-gray-700 mb-4">Identity</h2>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Client name</label>
										<input
											type="text"
											value={form.name}
											onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
											placeholder="e.g. Acme Corp"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Project name</label>
										<input
											type="text"
											value={form.projectName}
											onChange={(e) => setForm((f) => ({ ...f, projectName: e.target.value }))}
											placeholder="e.g. osca-acme"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
										/>
										<p className="text-xs text-gray-400 mt-1">Used in API calls and the embed snippet.</p>
									</div>
									<div className="col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Mongo DB name</label>
										<input
											type="text"
											value={form.dbName}
											onChange={(e) => setForm((f) => ({ ...f, dbName: e.target.value.trim() }))}
											placeholder="e.g. acme-agent-db"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
										/>
										<p className="text-xs text-gray-400 mt-1">
											Tenant database in MongoDB (collections: conversations, shares). Must be unique per client.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<h2 className="text-sm font-semibold text-gray-700 mb-4">LLM</h2>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Provider</label>
										<select
											value={form.provider}
											onChange={(e) => {
												const p = e.target.value as LLMProvider
												setForm((f) => ({ ...f, provider: p, model: modelsByProvider[p][0] }))
											}}
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
										>
											<option value="openai">OpenAI</option>
											<option value="claude">Claude (Anthropic)</option>
											<option value="gemini">Gemini (Google)</option>
										</select>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Model</label>
										<select
											value={form.model}
											onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
										>
											{modelsByProvider[form.provider].map((m) => (
												<option key={m} value={m}>{m}</option>
											))}
										</select>
									</div>
								</div>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<h2 className="text-sm font-semibold text-gray-700 mb-1">Allowed domains</h2>
								<p className="text-xs text-gray-400 mb-4">Requests from unlisted domains are rejected, even with a valid token.</p>
								<div className="flex flex-wrap gap-2 mb-3 min-h-8">
									{form.domains.map((d) => (
										<span key={d} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-mono">
											{d}
											<button type="button" onClick={() => removeDomain(d)} className="text-gray-400 hover:text-red-500 transition-colors leading-none">×</button>
										</span>
									))}
									{form.domains.length === 0 && (
										<span className="text-xs text-gray-300 py-1.5">No domains added yet</span>
									)}
								</div>
								<div className="flex gap-2">
									<input
										type="text"
										value={newDomain}
										onChange={(e) => setNewDomain(e.target.value)}
										onKeyDown={(e) => e.key === 'Enter' && addDomain()}
										placeholder="e.g. yoursite.com"
										className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
									/>
									<button type="button" onClick={addDomain} className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
										Add
									</button>
								</div>
							</div>
						</>
					)}

					{/* PROMPT */}
					{tab === 'prompt' && (
						<div className="space-y-5">
							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<div className="flex items-center justify-between mb-1">
									<h2 className="text-sm font-semibold text-gray-700">System prompt (TOML)</h2>
									<span className="text-xs text-gray-400">{form.prompt.length} chars</span>
								</div>
								<p className="text-xs text-gray-400 mb-4">Leave empty to inherit the global default prompt.</p>
								<textarea
									value={form.prompt}
									onChange={(e) => setForm((f) => ({ ...f, prompt: e.target.value }))}
									rows={14}
									className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono resize-none"
									placeholder={`[persona]\nname = "Osca"\nrole = "Smart adviser"\nmax_history_size = 20\n\n[welcome]\nmessage = "Hi, I'm Osca."\ninitial_questions = [\n  "What services do you offer?"\n]`}
								/>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<h2 className="text-sm font-semibold text-gray-700 mb-1">Related topics prompt (LightRAG)</h2>
								<p className="text-xs text-gray-400 mb-4">
									Sent as <code className="rounded bg-gray-100 px-1">topics_prompt</code> when loading related topics. Leave empty to use the chat
									app default.
								</p>
								<textarea
									value={form.topicsPrompt}
									onChange={(e) => setForm((f) => ({ ...f, topicsPrompt: e.target.value }))}
									rows={6}
									className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono resize-y min-h-[120px]"
									placeholder="Instruction text for the related-topics model…"
								/>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<h2 className="text-sm font-semibold text-gray-700 mb-1">Initial questions</h2>
								<p className="text-xs text-gray-400 mb-4">
									Buttons under the first assistant message. Empty array <code className="rounded bg-gray-100 px-1">[]</code> keeps the built-in
									default list. Each item: <code className="rounded bg-gray-100 px-1">id</code> (number),{' '}
									<code className="rounded bg-gray-100 px-1">text</code> (string), optional{' '}
									<code className="rounded bg-gray-100 px-1">label</code> (shorter button text).
								</p>
								<textarea
									value={quickQuestionsJson}
									onChange={(e) => setQuickQuestionsJson(e.target.value)}
									rows={12}
									className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono resize-y min-h-[200px]"
									placeholder={`[\n  { "id": 1, "text": "What services do you offer?", "label": "Services" }\n]`}
								/>
							</div>
						</div>
					)}

					{/* BRANDING — public widget profile (GET /api/tenant/context) */}
					{tab === 'branding' && (
						<div className="space-y-5">
							<div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
								<h2 className="text-sm font-semibold text-gray-700">Chat UI identity & copy</h2>
								<p className="text-xs text-gray-400">
									Served to the browser with the token; never includes DB name, domains, or system prompt. Empty fields use app defaults.
								</p>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Assistant name</label>
										<input
											type="text"
											value={form.publicBranding.assistantName}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, assistantName: e.target.value },
												}))
											}
											placeholder="e.g. OSCA"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Role badge</label>
										<input
											type="text"
											value={form.publicBranding.assistantBadge}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, assistantBadge: e.target.value },
												}))
											}
											placeholder="e.g. AI advisor"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
									<div className="col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Byline (landing header)</label>
										<input
											type="text"
											value={form.publicBranding.byline}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, byline: e.target.value },
												}))
											}
											placeholder="e.g. by Onepoint"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
									<div className="col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Hero eyebrow</label>
										<input
											type="text"
											value={form.publicBranding.heroEyebrow}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, heroEyebrow: e.target.value },
												}))
											}
											placeholder="Short uppercase line above the headline"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
									<div className="col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Hero title (optional)</label>
										<input
											type="text"
											value={form.publicBranding.heroTitle}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, heroTitle: e.target.value },
												}))
											}
											placeholder="If set, replaces the default two-line hero"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
									<div className="col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Hero subtitle</label>
										<textarea
											value={form.publicBranding.heroSubtitle}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, heroSubtitle: e.target.value },
												}))
											}
											rows={3}
											placeholder="Paragraph under the hero title"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y"
										/>
									</div>
									<div className="col-span-2">
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Disclaimer (plain text)</label>
										<textarea
											value={form.publicBranding.disclaimerText}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, disclaimerText: e.target.value },
												}))
											}
											rows={2}
											placeholder="Overrides default footer disclaimer when non-empty"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y"
										/>
									</div>
								</div>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
								<h2 className="text-sm font-semibold text-gray-700">Logo</h2>
								<p className="text-xs text-gray-400">HTTPS URLs only. Shown on the floating landing header when set.</p>
								<div className="grid grid-cols-1 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Logo URL</label>
										<input
											type="url"
											value={form.publicBranding.logoUrl}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, logoUrl: e.target.value },
												}))
											}
											placeholder="https://…"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Logo URL (dark) — optional</label>
										<input
											type="url"
											value={form.publicBranding.logoUrlDark}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, logoUrlDark: e.target.value },
												}))
											}
											placeholder="https://…"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Logo alt text</label>
										<input
											type="text"
											value={form.publicBranding.logoAlt}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, logoAlt: e.target.value },
												}))
											}
											placeholder="Accessibility description"
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
										/>
									</div>
								</div>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
								<h2 className="text-sm font-semibold text-gray-700">Typography</h2>
								<p className="text-xs text-gray-400">CSS font-family stacks, e.g. Inter, system-ui, sans-serif</p>
								<div className="grid grid-cols-1 gap-4">
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Sans / UI</label>
										<input
											type="text"
											value={form.publicBranding.fontSans}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, fontSans: e.target.value },
												}))
											}
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
										/>
									</div>
									<div>
										<label className="block text-xs font-medium text-gray-500 mb-1.5">Display / hero</label>
										<input
											type="text"
											value={form.publicBranding.fontDisplay}
											onChange={(e) =>
												setForm((f) => ({
													...f,
													publicBranding: { ...f.publicBranding, fontDisplay: e.target.value },
												}))
											}
											className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
										/>
									</div>
								</div>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
								<h2 className="text-sm font-semibold text-gray-700">Theme colors (hex)</h2>
								<p className="text-xs text-gray-400 mb-2">Examples: accent #9a19ff, bg dark #1F1925. Leave blank for built-in defaults.</p>
								<div className="grid grid-cols-2 gap-3">
									{(Object.keys(form.publicBranding.theme) as (keyof TenantPublicTheme)[]).map((key) => (
										<div key={key}>
											<label className="block text-xs font-medium text-gray-500 mb-1.5 font-mono">{key}</label>
											<input
												type="text"
												value={form.publicBranding.theme[key]}
												onChange={(e) =>
													setForm((f) => ({
														...f,
														publicBranding: {
															...f.publicBranding,
															theme: { ...f.publicBranding.theme, [key]: e.target.value },
														},
													}))
												}
												placeholder="#RRGGBB"
												className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* TOKEN */}
					{tab === 'token' && (
						<>
							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<h2 className="text-sm font-semibold text-gray-700 mb-1">Widget token</h2>
								<p className="text-xs text-gray-400 mb-4">Treat this like a secret key. Do not expose it in public repos.</p>
								<div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 mb-3">
									<code className="flex-1 text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
										{form.token}
									</code>
									<button
										type="button"
										onClick={() => copy(form.token, 'token')}
										className="text-xs text-violet-600 hover:text-violet-800 font-medium shrink-0 transition-colors"
									>
										{copied === 'token' ? 'Copied!' : 'Copy'}
									</button>
								</div>
								<button
									type="button"
									onClick={() => {
										void (async () => {
											try {
												if (isRegistryApiConfigured() && !isNew) {
													const c = await regenRegistryToken(form.id)
													setForm(c)
													addToast('New token saved in registry')
												} else {
													setForm((f) => ({ ...f, token: generateToken() }))
													addToast('Token regenerated locally — click Save client to persist')
												}
											} catch (e) {
												addToast(e instanceof Error ? e.message : String(e), 'error')
											}
										})()
									}}
									className="text-xs text-red-500 hover:text-red-700 border border-red-100 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
								>
									Regenerate token
								</button>
								<p className="text-xs text-gray-400 mt-2">
									Regenerating invalidates the current token immediately — existing embeds will break until updated.
								</p>
							</div>

							<div className="bg-white border border-gray-200 rounded-xl p-6">
								<div className="flex items-center justify-between mb-4">
									<div>
										<h2 className="text-sm font-semibold text-gray-700">Embed snippet</h2>
										<p className="text-xs text-gray-400 mt-0.5 space-y-1">
											<span className="block">
												Paste before the closing &lt;/body&gt; tag. <code className="text-gray-500">httpUrl</code> is the OSCA REST
												API; <code className="text-gray-500">websocketUrl</code> is the chat WebSocket.{' '}
												<code className="text-gray-500">clientToken</code> is this client’s registry token (the widget sends it as the{' '}
												<code className="text-gray-500">X-Osca-Token</code> header).
											</span>
											<span className="block">
												Production snippet values: set <code className="text-gray-500">VITE_EMBED_SNIPPET_HTTP_URL</code>,{' '}
												<code className="text-gray-500">VITE_EMBED_SNIPPET_WS_URL</code>, and{' '}
												<code className="text-gray-500">VITE_EMBED_SNIPPET_WIDGET_SCRIPT_URL</code> in{' '}
												<code className="text-gray-500">osca-configurator/.env</code> (hosted <code className="text-gray-500">widget.iife.js</code> URL), then restart Vite.
											</span>
											<span className="block">
												The Context / LightRAG service (<code className="text-gray-500">CONTEXT_API_*</code>) is server-only — not set here.
											</span>
										</p>
									</div>
									<button
										type="button"
										onClick={() => copy(snippet, 'snippet')}
										className="text-xs text-violet-600 hover:text-violet-800 font-medium border border-violet-200 hover:border-violet-300 px-3 py-1.5 rounded-lg transition-colors"
									>
										{copied === 'snippet' ? '✓ Copied' : 'Copy snippet'}
									</button>
								</div>
								<pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs font-mono text-gray-600 overflow-x-auto leading-relaxed">
									{snippet}
								</pre>
								<p className="text-xs text-gray-400 mt-3">
									<strong className="text-gray-500">Reminder:</strong>{' '}
									<code className="rounded bg-gray-100 px-1">clientToken</code> in the snippet is always this saved client’s token; only the
									three <code className="rounded bg-gray-100 px-1">VITE_EMBED_SNIPPET_*</code> env vars change the default URLs in the copied HTML.
								</p>
							</div>
						</>
					)}
				</div>

				{/* Sidebar summary */}
				<div className="space-y-4">
					<div className="bg-white border border-gray-200 rounded-xl p-5">
						<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Summary</h3>
						<dl className="space-y-3">
							<div>
								<dt className="text-xs text-gray-400">Status</dt>
								<dd className="mt-0.5">
									<span className={`text-xs font-medium px-2 py-0.5 rounded-full ${form.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
										}`}>
										{form.active ? 'Active' : 'Inactive'}
									</span>
								</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Provider</dt>
								<dd className="text-sm text-gray-700 capitalize mt-0.5">{form.provider}</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Model</dt>
								<dd className="text-sm text-gray-700 font-mono mt-0.5">{form.model}</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Mongo DB</dt>
								<dd className="text-sm text-gray-700 font-mono mt-0.5">{form.dbName || '—'}</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Domains</dt>
								<dd className="text-sm text-gray-700 mt-0.5">{form.domains.length} allowed</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Prompt</dt>
								<dd className="text-sm text-gray-700 mt-0.5">{form.prompt ? 'Custom' : 'Global default'}</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Topics prompt</dt>
								<dd className="text-sm text-gray-700 mt-0.5">{form.topicsPrompt?.trim() ? 'Custom' : 'App default'}</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Quick questions</dt>
								<dd className="text-sm text-gray-700 mt-0.5">
									{form.predefinedQuickQuestions?.length ? `${form.predefinedQuickQuestions.length} custom` : 'App default'}
								</dd>
							</div>
							<div>
								<dt className="text-xs text-gray-400">Public branding</dt>
								<dd className="text-sm text-gray-700 mt-0.5">
									{isPublicBrandingConfigured(form.publicBranding) ? 'Custom' : 'App default'}
								</dd>
							</div>
						</dl>
					</div>

					<div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
						<p className="text-xs font-semibold text-amber-700 mb-1">Remember to save</p>
						<p className="text-xs text-amber-600">Changes are not persisted until you click Save client.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function WidgetBuilder() {
	const { selected, isNew, setSelected, clients } = useClientStore()

	if (!selected) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
					<svg className="w-7 h-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</div>
				<h2 className="text-lg font-semibold text-gray-900 mb-2">No client selected</h2>
				<p className="text-sm text-gray-500 mb-6 max-w-xs">
					Pick a client below or go to the Clients tab to create a new one.
				</p>
				<div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full max-w-md text-left">
					{clients.length === 0 && (
						<p className="text-sm text-gray-400 px-6 py-8 text-center">No clients yet</p>
					)}
					{clients.map((c) => (
						<button
							key={c.id}
							type="button"
							onClick={() => setSelected(c, false)}
							className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
						>
							<div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-xs font-semibold shrink-0">
								{c.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">{c.name}</p>
								<p className="text-xs text-gray-400 font-mono">{c.projectName}</p>
							</div>
							<span className="ml-auto text-xs text-gray-400">→</span>
						</button>
					))}
				</div>
			</div>
		)
	}

	const formKey = `${selected.id}-${isNew ? 'new' : 'edit'}`

	return (
		<WidgetBuilderForm
			key={formKey}
			initialClient={selected}
			isNew={isNew}
		/>
	)
}
