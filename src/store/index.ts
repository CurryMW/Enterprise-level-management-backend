import { create } from 'zustand'

export const useStore = create<{
  collapsed: boolean,
  currentMenu: string,
  setCollapsed: () => void,
  setCurrentMenu: (menu: string) => void
}>((set) => ({
  collapsed: false,
  currentMenu: '/dashboard',
  setCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setCurrentMenu: (menu: string) => set(() => ({ currentMenu: menu })),
}))
