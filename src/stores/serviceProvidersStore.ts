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

    updateServiceProvider(sp: any, cb: (success: boolean, data: any) => void | undefined) {
      this.loading = true;
      delete this.error;
      axios
        .put(config.APIURL + 'service-providers/' + sp.id, sp)
        .then(data => !cb ? this.serviceProvider = data.data : cb(true, data.data))
        .catch(err => !cb ? this.error = err.response.data : cb(false, err.response.data))
        .finally(() => {
          this.loading = false;

          if (!cb) {
            setTimeout(() => delete this.error, config.errorDisplayTimeout)
          }
        });
    }
  },
})

