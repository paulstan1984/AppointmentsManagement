import { defineStore } from 'pinia'
// @ts-ignore
import { APIMethods } from './apimethods';
import config from './environment';

export const serviceProviderStore = defineStore('serviceProviderStore', {

  state: () => ({
    searchResults: undefined,
    error: undefined,
    loading: false,
    resourceURL: config.ServiceProvudersURL
  }),

  actions: {
    search(keyword = undefined) {

      APIMethods.search(this, keyword);
    },

    store(item: any, cb: (success: boolean, data: any) => void) {
      APIMethods.store(this, item, cb);
    },

    delete(item: any, cb: (success: boolean, data: any) => void) {
      APIMethods.delete(this, item, cb);
    }
  },
})

