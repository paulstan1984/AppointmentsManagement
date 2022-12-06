import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    error: undefined,
    loading: false
  }),

  actions: {
    getServiceProviders(callback: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;
      axios
        .get(config.APIURL + 'service-providers-search/1')
        .then(data => callback(true, data.data))
        .catch(err => { this.error = err.response.data; callback(false, this.error); })
        .finally(() => { this.loading = false; setTimeout(() => delete this.error, config.errorDisplayTimeout) });
    },

    updateServiceProvider(sp: any, callback: (error: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;
      axios
        .put(config.APIURL + 'service-providers/' + sp.id, sp)
        .then(data => callback(true, data.data))
        .catch(err => { this.error = err.response.data; callback(false, this.error); })
        .finally(() => { this.loading = false; setTimeout(() => delete this.error, config.errorDisplayTimeout) });
    }
  },
})

