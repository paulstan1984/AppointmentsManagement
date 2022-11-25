import { defineStore } from 'pinia'
import axios from 'axios';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    APIURL: 'http://timetable-system.test/timetable-api/public/api/',
    serviceProviders: [],
  }),

  actions: {
    getServiceProviders() {
      axios
        .get(this.APIURL + 'service-providers-search/1')
        .then(data => this.serviceProviders = data.data.results);
    }
  },
})

