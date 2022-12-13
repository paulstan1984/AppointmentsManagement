import { defineStore } from 'pinia'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

const resourceURL = 'phisical-resources';

export const phisicalResourcesStore = defineStore('phisicalResourcesStore', {

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
        .get(config.APIURL + resourceURL + '-search/1' + urlAddition)
        .then(data => this.searchResults = data.data)
        .catch(err => this.error = err)
        .finally(() => {
          this.loading = false;
          setTimeout(() => delete this.error, config.errorDisplayTimeout)
        });
    },

    store(item: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;
      let apiCall = undefined;

      if (item.id > 0) {
        apiCall = axios
          .put(config.APIURL + resourceURL + '/' + item.id, item);
      } else {
        apiCall = axios
          .post(config.APIURL + resourceURL, item);
      }
      apiCall.then(data => cb(true, data.data))
        .catch(err => cb(false, err.response.data))
        .finally(() => {
          this.loading = false;
        });
    },

    delete(item: any, cb: (success: boolean, data: any) => void) {
      this.loading = true;
      delete this.error;
      let apiCall = axios
        .delete(config.APIURL + resourceURL + '/' + item.id);

      apiCall.then(data => cb(true, data.data))
        .catch(err => cb(false, err.response.data))
        .finally(() => {
          this.loading = false;
        });
    }
  },
})

