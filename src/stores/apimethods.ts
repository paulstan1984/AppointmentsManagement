import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

export class APIMethods {

    public static search(entitiesStore: any, keyword = undefined, additional_parameters: any[] = []) {

        let urlAddition = '';
        if (keyword && (keyword as string).length > 0) {
            urlAddition = '/' + keyword;
        }
        
        for(let p of additional_parameters){
            urlAddition = urlAddition + '/' + p;
        }

        entitiesStore.loading = true;
        delete entitiesStore.error;
        axios
            .get(config.APIURL + entitiesStore.resourceURL + '-search/1' + urlAddition)
            .then(data => entitiesStore.searchResults = data.data)
            .catch(err => entitiesStore.error = err)
            .finally(() => {
                entitiesStore.loading = false;
                setTimeout(() => delete entitiesStore.error, config.errorDisplayTimeout)
            });
    };

    public static store(entitiesStore: any, item: any, cb: (success: boolean, data: any) => void) {
        entitiesStore.loading = true;
        delete entitiesStore.error;
        let apiCall = undefined;

        if (item.id > 0) {
            apiCall = axios
                .put(config.APIURL + entitiesStore.resourceURL + '/' + item.id, item);
        } else {
            apiCall = axios
                .post(config.APIURL + entitiesStore.resourceURL, item);
        }
        apiCall.then(data => cb(true, data.data))
            .catch(err => cb(false, err.response.data))
            .finally(() => {
                entitiesStore.loading = false;
            });
    };

    public static delete(entitiesStore: any, item: any, cb: (success: boolean, data: any) => void) {
        entitiesStore.loading = true;
        delete entitiesStore.error;
        let apiCall = axios
            .delete(config.APIURL + entitiesStore.resourceURL + '/' + item.id);

        apiCall.then(data => cb(true, data.data))
            .catch(err => cb(false, err.response.data))
            .finally(() => {
                entitiesStore.loading = false;
            });
    }
}
