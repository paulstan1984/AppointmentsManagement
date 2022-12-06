import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    searchResults: undefined,
    serviceProvider: undefined,
    error: undefined,
    loading: false
  }),

  actions: {
    getServiceProviders() {
      this.loading = true;
      delete this.error;
      axios
        .get(config.APIURL + 'service-providers-search/1')
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err.response.data)
        .finally(() => { this.loading = false; setTimeout(() => delete this.error, config.errorDisplayTimeout) });
    },

    updateServiceProvider(sp: any, callback: any) {
      this.loading = true;
      delete this.error;
      axios
        .put(config.APIURL + 'service-providers/' + sp.id, sp)
        .then(data => callback(true, data))
        .catch(err => this.error = err.response.data)
        .finally(() => { this.loading = false; callback(false, this.error) });
    }
  },
})

