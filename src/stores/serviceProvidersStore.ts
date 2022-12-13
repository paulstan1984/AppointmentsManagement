import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';


/**
 * The search method does not have callback function
 * All other methods have callback function. 
 * */
export const serviceProvidersStore = defineStore('serviceProvidersStore', {

  state: () => ({
    searchResults: undefined,
    error: undefined,
    loading: false
  }),

  actions: {
    getServiceProviders(keyword = undefined) {
      
      let urlAddition = '';
      if(keyword){
        urlAddition = '/' + keyword;
      }

      this.loading = true;
      delete this.error;
      axios
        .get(config.APIURL + 'service-providers-search/1' + urlAddition)
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err.response.data)
        .finally(() => {
          this.loading = false;
          setTimeout(() => delete this.error, config.errorDisplayTimeout);
        });
    },

    storeServiceProvider(sp: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;
      let apiCall = undefined;

      if (sp.id > 0) {
        apiCall = axios
          .put(config.APIURL + 'service-providers/' + sp.id, sp);
      } else {
        apiCall = axios
          .post(config.APIURL + 'service-providers', sp);
      }
      apiCall.then(data => cb(true, data.data))
        .catch(err => cb(false, err.response.data))
        .finally(() => {
          this.loading = false;
        });
    },

    deleteServiceProvider(sp: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;
      let apiCall = axios
        .delete(config.APIURL + 'service-providers/' + sp.id);

      apiCall.then(data => cb(true, data.data))
        .catch(err => cb(false, err.response.data))
        .finally(() => {
          this.loading = false;
        });
    }
  },
})

