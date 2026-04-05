import { create } from 'zustand'

type Role = 'admin' | 'client'

interface AuthState {
  role: Role | null
  name: string | null
  login: (role: Role, name: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  name: null,
  login: (role, name) => set({ role, name }),
  logout: () => set({ role: null, name: null }),
}))