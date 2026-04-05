import { create } from 'zustand'
import type { Client, GlobalConfig } from '../Types'

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
    provider: 'openai',
    model: 'gpt-4o',
    domains: ['osca.onepointltd.ai', 'localhost:5173'],
    token: 'osca_live_4f9a2c1b8e3d7f06a5c2e9b1d4f8a3c7',
    prompt: '[persona]\nname = "Osca"\nrole = "Onepoint adviser"\nmax_history_size = 20',
    active: true,
    createdAt: '2024-11-01',
  },
  {
    id: '2',
    name: 'Acme Corp',
    projectName: 'osca-acme',
    provider: 'claude',
    model: 'claude-opus-4-6',
    domains: ['acme.com', 'app.acme.com'],
    token: 'osca_live_b2d5f8a1c4e7901b3d6f9a2c5e8b1d4f',
    prompt: '[persona]\nname = "Aria"\nrole = "Acme support adviser"\nmax_history_size = 15',
    active: true,
    createdAt: '2025-01-15',
  },
  {
    id: '3',
    name: 'GlobalEx',
    projectName: 'osca-globalex',
    provider: 'gemini',
    model: 'gemini-pro',
    domains: ['globalex.io'],
    token: 'osca_live_e3c6a9d2f5b8011e4c7a0d3f6b9e2c5a',
    prompt: '[persona]\nname = "Osca"\nrole = "GlobalEx adviser"\nmax_history_size = 10',
    active: false,
    createdAt: '2025-03-02',
  },
]

interface ClientStore {
  clients: Client[]
  selected: Client | null
  isNew: boolean
  setSelected: (client: Client | null, isNew?: boolean) => void
  saveClient: (client: Client) => void
  deleteClient: (id: string) => void
  toggleActive: (id: string) => void
  globalConfig: GlobalConfig
  setGlobalConfig: (config: GlobalConfig) => void
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: seed,
  selected: null,
  isNew: false,
  setSelected: (client, isNew = false) => set({ selected: client, isNew }),
  saveClient: (client) =>
    set((s) => {
      const exists = s.clients.find((c) => c.id === client.id)
      return {
        clients: exists
          ? s.clients.map((c) => (c.id === client.id ? client : c))
          : [...s.clients, client],
        selected: client,
        isNew: false,
      }
    }),
  deleteClient: (id) =>
    set((s) => ({ clients: s.clients.filter((c) => c.id !== id), selected: null })),
  toggleActive: (id) =>
    set((s) => ({
      clients: s.clients.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    })),
  globalConfig: {
    defaultProvider: 'openai',
    defaultModel: 'gpt-4o',
    openaiKey: 'sk-proj-placeholder',
    anthropicKey: 'sk-ant-placeholder',
    geminiKey: '',
    defaultPrompt,
    restPort: '5000',
    wsPort: '4000',
  },
  setGlobalConfig: (config) => set({ globalConfig: config }),
}))