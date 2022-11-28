import { defineStore } from 'pinia'
import axios from 'axios';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    APIURL: 'http://timetable-system.test/timetable-api/public/api/',
    searchResults: undefined,
    error: undefined,
    loading: false
  }),

  actions: {
    getServiceProviders() {
      this.loading = true;
      axios
        .get(this.APIURL + 'service-providers-search/1')
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err)
        .finally(() => this.loading = false);
    }
  },
})

