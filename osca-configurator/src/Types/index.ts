export type LLMProvider = 'openai' | 'claude' | 'gemini'

export interface Client {
  id: string
  name: string
  projectName: string
  provider: LLMProvider
  model: string
  domains: string[]
  token: string
  prompt: string
  active: boolean
  createdAt: string
}

export interface GlobalConfig {
  defaultProvider: LLMProvider
  defaultModel: string
  openaiKey: string
  anthropicKey: string
  geminiKey: string
  defaultPrompt: string
  restPort: string
  wsPort: string
}