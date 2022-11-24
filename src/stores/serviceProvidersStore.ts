import { defineStore } from 'pinia'
import axios from 'axios';

export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    APIURL: 'http://timetable-system.test/timetable-api/public/api/',
    serviceProviders: [],
  }),

  actions: {
    async fetchData() {
      // you can directly mutate the state
      const result = await axios.get(this.APIURL + 'service-providers-search/1')
      console.log(result);
    },
  },
})

