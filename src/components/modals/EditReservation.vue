<script lang = "ts">
import { defineComponent } from 'vue'
import Loader from '@/components/shared/Loader.vue';

// @ts-ignore
import { phisicalResourceStore } from '@/stores/phisicalresourcestore.ts';
// @ts-ignore
import { serviceProviderStore } from '@/stores/serviceProviderStore.ts';

export default defineComponent({

    components: {
        Loader
    },

    props: ['entity'],
    emits: ['close', 'saved'],

    data() {
        return {
            store: phisicalResourceStore(),
            spStore: serviceProviderStore(),
            error: undefined,
            valid: false,
            service_providers: [],
            searchServiceProvider: '',
            nameRules: [
                (v: any) => (v || '').length <= 50 || 'A maximum of 50 characters is allowed.',
                (v: any) => !!v || 'Name is required',
                // @ts-ignore
                (v: any) => !this.error?.name || this.error.name[0],
            ],
            phoneRules: [
                (v: any) => (v || '').length <= 10 || 'A maximum of 10 characters is allowed.',
                (v: any) => !!v || 'Phone is required',
                (v: any) => /\d+/.test(v) || 'Phone must be valid',
                // @ts-ignore
                (v: any) => !this.error?.phone || this.error.phone[0],
            ],
            emailRules: [
                (v: any) => (v || '').length <= 200 || 'A maximum of 200 characters is allowed.',
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
                // @ts-ignore
                (v: any) => !this.error?.email || this.error.emal[0],
            ],

            serviceProviderRules: [
                // @ts-ignore
                (v: any) => !this.error?.service_provider_id || this.error.service_provider_id[0],
            ],
        }
    },

    watch: {
        searchServiceProvider(val) {
            this.spStore.search(val);
        }
    },

    methods: {
        async Save() {

            //@ts-ignore 
            await this.$refs.form.resetValidation();
            this.error = undefined;
            //@ts-ignore
            await this.$refs.form.validate();

            if (this.valid == false) return;

            this.store.store(this.entity, (success: boolean, data: any) => {
                if (success) {
                    this.$emit('saved');
                } else {
                    this.error = data;
                    //@ts-ignore 
                    this.$refs.form.validate();
                }
            });
        },

    },

    mounted() {
        this.spStore.search();
        if (this.entity.open == 1) {
            this.entity.open = true;
        } else {
            this.entity.open = false;
        }
    }
});
</script>

<template>
    <v-form ref="form" v-model="valid">
        <v-text-field v-model="entity.client_name" @keydown.enter="Save()" :counter="100" :rules="nameRules"
            label="Client Name" required></v-text-field>
        <v-text-field v-model="entity.client_email" @keydown.enter="Save()" :counter="100" :rules="emailRules"
            label="Client Email" required></v-text-field>
        <v-text-field v-model="entity.client_phone" @keydown.enter="Save()" :counter="100" :rules="phoneRules"
            label="Client Phone" required></v-text-field>

        <v-autocomplete v-model="entity.service_provider_id" :items="spStore.searchResults?.results"
            label="Service Provider" item-title="name" item-value="id" :rules="serviceProviderRules"
            v-model:search="searchServiceProvider"></v-autocomplete>

        <v-row class="mt-5">
            <v-btn color="error" class="mr-4" @click="$emit('close')">
                Cancel
            </v-btn>

            <v-btn color="success" class="mr-4" @click="Save()">
                Save
            </v-btn>
        </v-row>
        <Loader v-if="store.loading"></Loader>

    </v-form>
</template>
