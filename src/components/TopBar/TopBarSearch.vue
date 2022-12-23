<script lang="ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { phisicalResourceStore } from '@/stores/phisicalresourcestore.ts';
// @ts-ignore
import { serviceProviderStore } from '@/stores/serviceProviderStore.ts';
// @ts-ignore
import { reservationStore } from '@/stores/reservationStore.ts';
// @ts-ignore
import { appStore } from '@/stores/appStore.ts';
import config from '@/stores/environment';

export default defineComponent({
    data() {
        return {
            phisicalResourceStore: phisicalResourceStore(),
            serviceProviderStore: serviceProviderStore(),
            reservationStore: reservationStore(),
            appStore: appStore(),
            keyword: ''
        }
    },

    methods: {
        Search() {
            switch (this.appStore.serviceProviderURL) {
                case config.ServiceProvudersURL:
                    this.serviceProviderStore.search(this.keyword);
                    break;
                case config.PhisicalResourcesURL:
                    this.phisicalResourceStore.search(this.keyword);
                    break;
                case config.ReservationsURL:
                    this.reservationStore.search(this.keyword);
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
