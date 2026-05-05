import { create } from 'zustand'
import type { Client, GlobalConfig } from '../Types'
import { emptyPublicBranding } from '../Types'
import {
  isRegistryApiConfigured,
  fetchRegistryClients,
  createRegistryClient,
  updateRegistryClient,
  deleteRegistryClient,
  patchRegistryClient,
} from '../lib/oscaAdminApi'

const defaultPrompt = `[persona]
name = "Osca"
role = "Smart adviser"
max_history_size = 20

[welcome]
message = "Hi, I'm Osca. How can I help you today?"
initial_questions = [
  "What services do you offer?",
  "Tell me about your pricing"
]`

const seed: Client[] = [
  {
    id: '1',
    name: 'Onepoint (internal)',
    projectName: 'osca-onepoint',
    dbName: 'onepoint-agent-db',
    provider: 'openai',
    model: 'gpt-4o',
    domains: ['osca.onepointltd.ai', 'localhost:5173'],
    token: 'osca_live_4f9a2c1b8e3d7f06a5c2e9b1d4f8a3c7',
    prompt: '[persona]\nname = "Osca"\nrole = "Onepoint adviser"\nmax_history_size = 20',
    topicsPrompt: '',
    predefinedQuickQuestions: [],
    publicBranding: emptyPublicBranding(),
    active: true,
    createdAt: '2024-11-01',
  },
  {
    id: '2',
    name: 'Acme Corp',
    projectName: 'osca-acme',
    dbName: 'acme-agent-db',
    provider: 'claude',
    model: 'claude-opus-4-6',
    domains: ['acme.com', 'app.acme.com'],
    token: 'osca_live_b2d5f8a1c4e7901b3d6f9a2c5e8b1d4f',
    prompt: '[persona]\nname = "Aria"\nrole = "Acme support adviser"\nmax_history_size = 15',
    topicsPrompt: '',
    predefinedQuickQuestions: [],
    active: true,
    createdAt: '2025-01-15',
    publicBranding: emptyPublicBranding(),
  },
  {
    id: '3',
    name: 'GlobalEx',
    projectName: 'osca-globalex',
    dbName: 'globalex-agent-db',
    provider: 'gemini',
    model: 'gemini-pro',
    domains: ['globalex.io'],
    token: 'osca_live_e3c6a9d2f5b8011e4c7a0d3f6b9e2c5a',
    prompt: '[persona]\nname = "Osca"\nrole = "GlobalEx adviser"\nmax_history_size = 10',
    topicsPrompt: '',
    predefinedQuickQuestions: [],
    publicBranding: emptyPublicBranding(),
    active: false,
    createdAt: '2025-03-02',
  },
]

export type RegistryMode = 'demo' | 'live' | 'error'

interface ClientStore {
  clients: Client[]
  registryMode: RegistryMode
  registryError: string | null
  selected: Client | null
  isNew: boolean
  setSelected: (client: Client | null, isNew?: boolean) => void
  loadClients: () => Promise<void>
  saveClient: (client: Client, isNew: boolean) => Promise<void>
  deleteClient: (id: string) => Promise<void>
  toggleActive: (id: string) => Promise<void>
  globalConfig: GlobalConfig
  setGlobalConfig: (config: GlobalConfig) => void
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  registryMode: 'demo',
  registryError: null,
  selected: null,
  isNew: false,
  setSelected: (client, isNew = false) => set({ selected: client, isNew }),

  loadClients: async () => {
    if (!isRegistryApiConfigured()) {
      set({ clients: seed, registryMode: 'demo', registryError: null })
      return
    }
    try {
      const clients = await fetchRegistryClients()
      set({ clients, registryMode: 'live', registryError: null })
    } catch (e) {
      set({
        registryMode: 'error',
        registryError: e instanceof Error ? e.message : String(e),
        clients: seed,
      })
    }
  },

  saveClient: async (client, isNew) => {
    if (!isRegistryApiConfigured()) {
      set((s) => {
        const exists = s.clients.find((c) => c.id === client.id)
        return {
          clients: exists
            ? s.clients.map((c) => (c.id === client.id ? client : c))
            : [...s.clients, client],
          selected: client,
          isNew: false,
        }
      })
      return
    }

    if (isNew) {
      const { id: _omitId, createdAt: _omitCreated, ...rest } = client
      void _omitId
      void _omitCreated
      const created = await createRegistryClient(rest)
      set((s) => ({
        clients: [...s.clients.filter((c) => c.id !== client.id), created],
        selected: created,
        isNew: false,
      }))
      return
    }

    const updated = await updateRegistryClient(client)
    set((s) => ({
      clients: s.clients.map((c) => (c.id === updated.id ? updated : c)),
      selected: updated,
      isNew: false,
    }))
  },

  deleteClient: async (id) => {
    if (isRegistryApiConfigured()) {
      await deleteRegistryClient(id)
    }
    set((s) => ({ clients: s.clients.filter((c) => c.id !== id), selected: null }))
  },

  toggleActive: async (id) => {
    const c = get().clients.find((x) => x.id === id)
    if (!c) return

    if (!isRegistryApiConfigured()) {
      set((s) => ({
        clients: s.clients.map((x) => (x.id === id ? { ...x, active: !x.active } : x)),
      }))
      return
    }

    const updated = await patchRegistryClient(id, { active: !c.active })
    set((s) => ({
      clients: s.clients.map((x) => (x.id === id ? updated : x)),
    }))
  },

  globalConfig: {
    defaultProvider: 'openai',
    defaultModel: 'gpt-4o',
    openaiKey: 'sk-proj-placeholder',
    anthropicKey: 'sk-ant-placeholder',
    geminiKey: '',
    defaultPrompt,
    restPort: '5000',
    wsPort: '5000',
  },
  setGlobalConfig: (config) => set({ globalConfig: config }),
}))
