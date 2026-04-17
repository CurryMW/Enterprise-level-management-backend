import { create } from 'zustand'

export const useStore = create<{
  collapsed: boolean,
  setCurrentMenu: () => void
}>((set) => ({
  collapsed: false,
  setCurrentMenu: () => set((state) => ({ collapsed: !state.collapsed })),
}))
