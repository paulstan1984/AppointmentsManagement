import { defineStore } from 'pinia'
// @ts-ignore
import { APIMethods } from './apimethods';
import config from './environment';

export const phisicalResourceStore = defineStore('phisicalResourceStore', {

  state: () => ({
    searchResults: undefined,
    error: undefined,
    loading: false,
    resourceURL: config.PhisicalResourcesURL
  }),

  actions: {

    searchProviderResource(service_provider_id: number, keyword = undefined) {
      APIMethods.search(this, keyword, [service_provider_id]);
    },

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

