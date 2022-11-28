import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export const phisicalResourcesStore = defineStore('phisicalResourcesStore', {

  state: () => ({
    searchResults: undefined,
    error: undefined,
    loading: false
  }),

  actions: {
    getPhisicalResources() {
      this.loading = true;
      delete this.error;
      axios
        .get(config.APIURL + 'phisical-resources-search/1')
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err)
        .finally(() => { this.loading = false; setTimeout(() => delete this.error, config.errorDisplayTimeout) });
    }
  },
})

