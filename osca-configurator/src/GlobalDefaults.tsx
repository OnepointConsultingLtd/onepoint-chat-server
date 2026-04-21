import { useState } from 'react'
import { useClientStore } from './store/clientStore'
import { useToast } from './hooks/useToast'
import type { LLMProvider } from './Types'

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
	return (
		<div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm shadow-lg text-white ${type === 'success' ? 'bg-emerald-600' : 'bg-red-500'
			}`}>
			<span>{type === 'success' ? '✓' : '✕'}</span>
			{message}
		</div>
	)
}

const modelsByProvider: Record<LLMProvider, string[]> = {
	openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
	claude: ['claude-opus-4-6', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'],
	gemini: ['gemini-pro', 'gemini-1.5-pro', 'gemini-flash'],
}

export default function GlobalDefaults() {
	const { globalConfig, setGlobalConfig } = useClientStore()
	const { toasts, addToast } = useToast()
	const [form, setForm] = useState({ ...globalConfig })
	const [showKeys, setShowKeys] = useState(false)

	function handleSave() {
		setGlobalConfig(form)
		addToast('Global defaults saved')
	}

	return (
		<div>
			<div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
				{toasts.map((t) => <Toast key={t.id} message={t.message} type={t.type} />)}
			</div>

			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-xl font-semibold text-gray-900">Global defaults</h1>
					<p className="text-sm text-gray-500 mt-0.5">Shared across all clients unless overridden per-client</p>
				</div>
				<button
					onClick={handleSave}
					className="text-sm px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
				>
					Save defaults
				</button>
			</div>

			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2 space-y-5">

					<div className="bg-white border border-gray-200 rounded-xl p-6">
						<h2 className="text-sm font-semibold text-gray-700 mb-4">LLM defaults</h2>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-medium text-gray-500 mb-1.5">Default provider</label>
								<select
									value={form.defaultProvider}
									onChange={(e) => {
										const p = e.target.value as LLMProvider
										setForm({ ...form, defaultProvider: p, defaultModel: modelsByProvider[p][0] })
									}}
									className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
								>
									<option value="openai">OpenAI</option>
									<option value="claude">Claude (Anthropic)</option>
									<option value="gemini">Gemini (Google)</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-500 mb-1.5">Default model</label>
								<select
									value={form.defaultModel}
									onChange={(e) => setForm({ ...form, defaultModel: e.target.value })}
									className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
								>
									{modelsByProvider[form.defaultProvider].map((m) => (
										<option key={m} value={m}>{m}</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-xl p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-sm font-semibold text-gray-700">API keys</h2>
							<button
								onClick={() => setShowKeys(!showKeys)}
								className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1 rounded-lg transition-colors"
							>
								{showKeys ? 'Hide' : 'Show'} keys
							</button>
						</div>
						<div className="space-y-4">
							{[
								{ label: 'OpenAI API key', field: 'openaiKey' as const, placeholder: 'sk-...' },
								{ label: 'Anthropic API key', field: 'anthropicKey' as const, placeholder: 'sk-ant-...' },
								{ label: 'Gemini API key', field: 'geminiKey' as const, placeholder: 'Not set' },
							].map(({ label, field, placeholder }) => (
								<div key={field}>
									<label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
									<input
										type={showKeys ? 'text' : 'password'}
										value={form[field]}
										onChange={(e) => setForm({ ...form, [field]: e.target.value })}
										placeholder={placeholder}
										className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
									/>
								</div>
							))}
						</div>
						<div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
							<p className="text-xs text-amber-700">
								These are fallback keys used when a client doesn't override them. In production, use environment variables — never commit keys to source control.
							</p>
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-xl p-6">
						<div className="flex items-center justify-between mb-1">
							<h2 className="text-sm font-semibold text-gray-700">Default system prompt (TOML)</h2>
							<span className="text-xs text-gray-400">{form.defaultPrompt.length} chars</span>
						</div>
						<p className="text-xs text-gray-400 mb-4">Used by any client that hasn't defined their own prompt.</p>
						<textarea
							value={form.defaultPrompt}
							onChange={(e) => setForm({ ...form, defaultPrompt: e.target.value })}
							rows={14}
							className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono resize-none"
						/>
					</div>

					<div className="bg-white border border-gray-200 rounded-xl p-6">
						<h2 className="text-sm font-semibold text-gray-700 mb-1">Server port</h2>
						<p className="text-xs text-gray-400 mb-4">
							OSCA serves HTTP and WebSocket on one port; chat connects to <code className="font-mono">/ws</code>.
						</p>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-medium text-gray-500 mb-1.5">HTTP + REST port</label>
								<input
									type="text"
									value={form.restPort}
									onChange={(e) => setForm({ ...form, restPort: e.target.value })}
									className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-500 mb-1.5">WebSocket port</label>
								<input
									type="text"
									value={form.wsPort}
									onChange={(e) => setForm({ ...form, wsPort: e.target.value })}
									className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
								/>
								<p className="text-[10px] text-gray-400 mt-1">Usually same as HTTP (path <span className="font-mono">/ws</span>).</p>
							</div>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="space-y-4">
					<div className="bg-white border border-gray-200 rounded-xl p-5">
						<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Current saved values</h3>
						<dl className="space-y-3">
							{[
								{ label: 'Provider', value: globalConfig.defaultProvider },
								{ label: 'Model', value: globalConfig.defaultModel, mono: true },
								{ label: 'HTTP port', value: globalConfig.restPort, mono: true },
								{ label: 'WS port', value: globalConfig.wsPort, mono: true },
								{ label: 'OpenAI key', value: globalConfig.openaiKey ? '••••••••' : 'Not set' },
								{ label: 'Anthropic key', value: globalConfig.anthropicKey ? '••••••••' : 'Not set' },
								{ label: 'Gemini key', value: globalConfig.geminiKey ? '••••••••' : 'Not set' },
							].map(({ label, value, mono }) => (
								<div key={label}>
									<dt className="text-xs text-gray-400">{label}</dt>
									<dd className={`text-sm text-gray-700 mt-0.5 ${mono ? 'font-mono' : 'capitalize'}`}>{value}</dd>
								</div>
							))}
						</dl>
					</div>

					<div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
						<p className="text-xs font-semibold text-gray-600 mb-1">Override per client</p>
						<p className="text-xs text-gray-400">
							Any value set in Widget builder overrides these defaults for that client only.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}