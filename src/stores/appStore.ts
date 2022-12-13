import { defineStore } from 'pinia'

export const appStore = defineStore('appState', {

  state: () => ({
    menuToggled: false,
    searchEntities: ''
  }),

  actions: {
    toggleMenu() {
      // you can directly mutate the state
      this.menuToggled = !this.menuToggled;
    },
  },
})
