import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClientStore } from './store/clientStore'
import type { Client, LLMProvider } from './Types'
import { emptyPublicBranding } from './Types'

function initials(name: string) {
	return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function generateToken() {
	const hex = () => Math.floor(Math.random() * 16).toString(16)
	return 'osca_live_' + Array.from({ length: 32 }, hex).join('')
}

const providerColors: Record<LLMProvider, string> = {
	openai: 'bg-emerald-50 text-emerald-700',
	claude: 'bg-orange-50 text-orange-700',
	gemini: 'bg-blue-50 text-blue-700',
}

export default function Clients() {
	const { clients, setSelected, toggleActive, deleteClient, registryMode, registryError } = useClientStore()
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

	const filtered = clients.filter(
		(c) =>
			c.name.toLowerCase().includes(search.toLowerCase()) ||
			c.projectName.toLowerCase().includes(search.toLowerCase())
	)

	function handleNew() {
		const blank: Client = {
			id: crypto.randomUUID(),
			name: '',
			projectName: '',
			dbName: '',
			provider: 'openai',
			model: 'gpt-4o',
			domains: [],
			token: generateToken(),
			prompt: '',
			topicsPrompt: '',
			predefinedQuickQuestions: [],
			publicBranding: emptyPublicBranding(),
			active: true,
			createdAt: new Date().toISOString().split('T')[0],
		}
		setSelected(blank, true)
		navigate('/widget-builder')
	}

	function handleEdit(client: Client) {
		setSelected(client, false)
		navigate('/widget-builder')
	}

	return (
		<div>
			{registryMode === 'demo' && (
				<p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-4">
					<strong>Demo data.</strong> Add <code className="text-xs bg-amber-100 px-1 rounded">VITE_OSCA_ADMIN_SECRET</code> and{' '}
					<code className="text-xs bg-amber-100 px-1 rounded">VITE_OSCA_API_URL</code> (optional, default http://localhost:5000) in{' '}
					<code className="text-xs bg-amber-100 px-1 rounded">osca-configurator/.env</code> — same value as server <code className="text-xs bg-amber-100 px-1 rounded">ADMIN_SECRET</code> — then reload to load/save the real Mongo registry.
				</p>
			)}
			{registryMode === 'error' && registryError && (
				<p className="text-sm text-red-800 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">
					<strong>Registry API error:</strong> {registryError}
				</p>
			)}
			{registryMode === 'live' && (
				<p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 mb-4">
					Connected to registry API — changes persist to <code className="text-xs bg-emerald-100 px-1 rounded">osca-registry</code>.
				</p>
			)}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-xl font-semibold text-gray-900">Clients</h1>
					<p className="text-sm text-gray-500 mt-0.5">{clients.length} deployments</p>
				</div>
				<button
					onClick={handleNew}
					className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
				>
					<span className="text-lg leading-none">+</span>
					New client
				</button>
			</div>

			<div className="mb-4">
				<input
					type="text"
					placeholder="Search clients..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
				/>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100">
							<th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">Client</th>
							<th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">Provider</th>
							<th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">Domains</th>
							<th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">Created</th>
							<th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wide px-6 py-3">Status</th>
							<th className="px-6 py-3" />
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-50">
						{filtered.map((client) => (
							<tr key={client.id} className="hover:bg-gray-50 transition-colors">
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-xs font-semibold shrink-0">
											{initials(client.name)}
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900">{client.name}</p>
											<p className="text-xs text-gray-400 font-mono">{client.projectName}</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className={`text-xs font-medium px-2 py-1 rounded-full ${providerColors[client.provider]}`}>
										{client.provider}
									</span>
								</td>
								<td className="px-6 py-4">
									<div className="flex flex-wrap gap-1">
										{client.domains.slice(0, 2).map((d) => (
											<span key={d} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
												{d}
											</span>
										))}
										{client.domains.length > 2 && (
											<span className="text-xs text-gray-400">+{client.domains.length - 2}</span>
										)}
									</div>
								</td>
								<td className="px-6 py-4 text-sm text-gray-400">{client.createdAt}</td>
								<td className="px-6 py-4">
									<button
										onClick={() => toggleActive(client.id)}
										className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${client.active ? 'bg-violet-600' : 'bg-gray-200'
											}`}
									>
										<span
											className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${client.active ? 'translate-x-4' : 'translate-x-1'
												}`}
										/>
									</button>
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-2 justify-end">
										<button
											onClick={() => handleEdit(client)}
											className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
										>
											Edit
										</button>
										<button
											onClick={() => setConfirmDelete(client.id)}
											className="text-xs text-red-400 hover:text-red-600 border border-red-100 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
						{filtered.length === 0 && (
							<tr>
								<td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">
									No clients found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{confirmDelete && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl border border-gray-200 p-6 max-w-sm w-full mx-4 shadow-xl">
						<h3 className="font-semibold text-gray-900 mb-2">Delete client?</h3>
						<p className="text-sm text-gray-500 mb-6">
							This permanently removes the client and invalidates their widget token. This cannot be undone.
						</p>
						<div className="flex gap-3 justify-end">
							<button
								onClick={() => setConfirmDelete(null)}
								className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									void deleteClient(confirmDelete)
									setConfirmDelete(null)
								}}
								className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}