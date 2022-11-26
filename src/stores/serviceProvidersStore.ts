import { defineStore } from 'pinia'
import axios from 'axios';

import type SearchResult from '@/models/SearchResult.vue';
import type ServiceProvider from '@/models/ServiceProvider.vue';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    APIURL: 'http://timetable-system.test/timetable-api/public/api/',
    searchResults: undefined,
    error: undefined
  }),

  actions: {
    getServiceProviders() {
      axios
        .get<SearchResult<ServiceProvider>>(this.APIURL + 'service-providers-search/1')
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err);
    }
  },
})

