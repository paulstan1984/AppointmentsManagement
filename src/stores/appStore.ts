import { defineStore } from 'pinia'

export const useAppStore = defineStore('appState', {

  state: () => ({
    menuToggled: false,
  }),

  actions: {
    toggleMenu() {
      // you can directly mutate the state
      this.menuToggled = !this.menuToggled;
    },
  },
})
