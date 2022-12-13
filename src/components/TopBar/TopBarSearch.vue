<script lang="ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { appStore } from '@/stores/appStore.ts';
// @ts-ignore
import { serviceProvidersStore } from '@/stores/serviceProvidersStore.ts';
// @ts-ignore
import { phisicalResourcesStore } from '@/stores/phisicalResourcesStore.ts';
// @ts-ignore
import { reservationsStore } from '@/stores/reservationsStore.ts';

export default defineComponent({
    data() {
        return {
            appStore: appStore(),
            spStore: serviceProvidersStore(),
            prStore: phisicalResourcesStore(),
            reStore: reservationsStore(),
            keyword: ''
        }
    },

    methods: {
        Search() {
            console.log(this.appStore.searchEntities);
            switch (this.appStore.searchEntities) {
                case 'sp':
                    this.spStore.getServiceProviders(this.keyword);
                    break;

                case 'pr':
                    this.prStore.getPhisicalResources(this.keyword);
                    break;

                case 're':
                    this.reStore.getReservations(this.keyword);
                    break;
            }
        }
    }
})
</script>



<template>
    <div class="form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">
            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                aria-label="Search" aria-describedby="basic-addon2" v-model="keyword" @keydown.enter="Search()">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="Search()">
                    <i class="fas fa-search fa-sm"></i>
                </button>
            </div>
        </div>
    </div>
</template>
