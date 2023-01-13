import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export const appStore = defineStore('appState', {

  state: () => ({
    menuToggled: false,
    serviceProviderURL: '',

    error: undefined,
    loading: false,

    authToken: localStorage.getItem(config.authToken),
  }),

  actions: {
    toggleMenu() {
      // you can directly mutate the state
      this.menuToggled = !this.menuToggled;
    },

    login(data: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;

      axios
        .post(config.APIURL + 'login', data)
        .then(data => {
          localStorage.setItem(config.authToken, data.data);
          cb(true, data.data);
        })
        .catch(err => cb(false, err.response.data))
        .finally(() => {
          this.loading = false;
        });
    },

    logout(data: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;

      axios
        .post(config.APIURL + 'logout', data)
        .then(data => {
          localStorage.deleteItem(config.authToken);
          cb(true, data.data);
        })
        .catch(err => cb(false, err?.response?.data))
        .finally(() => {
          this.loading = false;
        });
    },

    forgotPassword(data: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;

      axios
        .post(config.APIURL + 'forgot-password', data)
        .then(data => {
          cb(true, data.data);
        })
        .catch(err => cb(false, err?.response?.data))
        .finally(() => {
          this.loading = false;
        });
    },

    resetPassword(data: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;

      axios
        .post(config.APIURL + 'reset-password', data)
        .then(data => {
          cb(true, data.data);
        })
        .catch(err => cb(false, err?.response?.data))
        .finally(() => {
          this.loading = false;
        });
    }
  },
})
