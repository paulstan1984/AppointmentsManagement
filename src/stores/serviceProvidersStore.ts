import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    searchResults: undefined,
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
        .catch(err => this.error = err)
        .finally(() => { this.loading = false; setTimeout(() => delete this.error, config.errorDisplayTimeout) });
    },

    updateServiceProvider(sp: any) {
      this.loading = true;
      delete this.error;
      axios
        .put(config.APIURL + 'service-providers/' + sp.id, sp)
        .then(data => console.log(data))
        .catch(err => this.error = err)
        .finally(() => { this.loading = false; setTimeout(() => delete this.error, config.errorDisplayTimeout) });
    }
  },
})

