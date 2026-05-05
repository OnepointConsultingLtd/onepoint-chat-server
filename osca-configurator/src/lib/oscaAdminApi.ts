import {
  type Client,
  type LLMProvider,
  type PredefinedQuickQuestion,
  normalizePublicBranding,
} from '../Types'

const base = () => (import.meta.env.VITE_OSCA_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5000'

export function isRegistryApiConfigured(): boolean {
  return Boolean((import.meta.env.VITE_OSCA_ADMIN_SECRET as string | undefined)?.trim())
}

function adminHeaders(): HeadersInit {
  const secret = import.meta.env.VITE_OSCA_ADMIN_SECRET as string | undefined
  return {
    'Content-Type': 'application/json',
    ...(secret ? { 'x-admin-secret': secret } : {}),
  }
}

type RegistryDoc = {
  _id: string
  name: string
  projectName: string
  token: string
  domains: string[]
  provider: LLMProvider
  model: string
  prompt: string
  dbName: string
  active: boolean
  createdAt: string
  topicsPrompt?: string
  predefinedQuickQuestions?: PredefinedQuickQuestion[]
  publicBranding?: unknown
}

export function registryDocToClient(d: RegistryDoc): Client {
  return {
    id: d._id,
    name: d.name,
    projectName: d.projectName,
    provider: d.provider,
    model: d.model,
    domains: d.domains ?? [],
    token: d.token,
    prompt: d.prompt ?? '',
    dbName: d.dbName,
    topicsPrompt: typeof d.topicsPrompt === 'string' ? d.topicsPrompt : '',
    predefinedQuickQuestions: Array.isArray(d.predefinedQuickQuestions)
      ? d.predefinedQuickQuestions
      : [],
    publicBranding: normalizePublicBranding(d.publicBranding),
    active: d.active,
    createdAt: d.createdAt?.split('T')[0] ?? '',
  }
}

export async function fetchRegistryClients(): Promise<Client[]> {
  const response = await fetch(`${base()}/admin/clients`, { headers: adminHeaders() })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `GET /admin/clients failed (${response.status})`)
  }
  const docs = (await response.json()) as RegistryDoc[]
  return docs.map(registryDocToClient)
}

export async function createRegistryClient(c: Omit<Client, 'id' | 'createdAt'>): Promise<Client> {
  const response = await fetch(`${base()}/admin/clients`, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify({
      name: c.name,
      projectName: c.projectName,
      token: c.token,
      domains: c.domains,
      provider: c.provider,
      model: c.model,
      prompt: c.prompt,
      dbName: c.dbName,
      active: c.active,
      topicsPrompt: c.topicsPrompt,
      predefinedQuickQuestions: c.predefinedQuickQuestions,
      publicBranding: c.publicBranding,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `POST /admin/clients failed (${response.status})`)
  }
  const doc = (await response.json()) as RegistryDoc
  return registryDocToClient(doc)
}

export async function updateRegistryClient(c: Client): Promise<Client> {
  const response = await fetch(`${base()}/admin/clients/${c.id}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify({
      name: c.name,
      projectName: c.projectName,
      token: c.token,
      domains: c.domains,
      provider: c.provider,
      model: c.model,
      prompt: c.prompt,
      dbName: c.dbName,
      active: c.active,
      topicsPrompt: c.topicsPrompt,
      predefinedQuickQuestions: c.predefinedQuickQuestions,
      publicBranding: c.publicBranding,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `PUT /admin/clients/${c.id} failed (${response.status})`)
  }
  const doc = (await response.json()) as RegistryDoc
  return registryDocToClient(doc)
}

export async function deleteRegistryClient(id: string): Promise<void> {
  const response = await fetch(`${base()}/admin/clients/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `DELETE failed (${response.status})`)
  }
}

export async function patchRegistryClient(id: string, patch: Partial<Client>): Promise<Client> {
  const response = await fetch(`${base()}/admin/clients/${id}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify(patch),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `PUT failed (${response.status})`)
  }
  const doc = (await response.json()) as RegistryDoc
  return registryDocToClient(doc)
}

export async function regenRegistryToken(clientId: string): Promise<Client> {
  const response = await fetch(`${base()}/admin/clients/${clientId}/regen-token`, {
    method: 'POST',
    headers: adminHeaders(),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(err || `regen-token failed (${response.status})`)
  }
  const doc = (await response.json()) as RegistryDoc
  return registryDocToClient(doc)
}
