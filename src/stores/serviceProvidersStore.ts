import { defineStore } from 'pinia'
import axios from 'axios';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    APIURL: 'http://timetable-system.test/timetable-api/public/api/',
    searchResults: undefined,
    error: undefined
  }),

  actions: {
    getServiceProviders() {
      axios
        .get(this.APIURL + 'service-providers-search/1')
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err);
    }
  },
})

