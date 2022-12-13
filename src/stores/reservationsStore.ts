import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export const reservationsStore = defineStore('reservationsStore', {

  state: () => ({
    searchResults: undefined,
    error: undefined,
    loading: false
  }),

  actions: {
    search(keyword = undefined) {

      let urlAddition = '';
      if (keyword && (keyword as string).length > 0) {
        urlAddition = '/' + keyword;
      }

      this.loading = true;
      delete this.error;
      axios
        .get(config.APIURL + 'reservations-search/1' + urlAddition)
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err)
        .finally(() => { 
          this.loading = false; 
          setTimeout(() => delete this.error, config.errorDisplayTimeout) 
        });
    }
  },
})

