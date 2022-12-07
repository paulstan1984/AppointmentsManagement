<script lang = "ts">
import { defineComponent } from 'vue'
import Loader from '@/components/shared/Loader.vue';

// @ts-ignore
import { serviceProvidersStore } from '@/stores/serviceProvidersStore.ts';

export default defineComponent({

    components: {
        Loader
    },
    
    props: ['serviceprovider'],
    emits: ['close', 'saved'],

    data() {
        return {
            store: serviceProvidersStore(),
            error: undefined,
            valid: false,
            nameRules: [
                (v: any) => !!v || 'Name is required',
                // @ts-ignore
                (v: any) => !this.error?.name || this.error.name[0],
            ],
            phoneRules: [
                (v: any) => !!v || 'Phone is required',
                (v: any) => /\d+/.test(v) || 'Phone must be valid',
                // @ts-ignore
                (v: any) => !this.error?.phone || this.error.phone[0],
            ],
            emailRules: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
                // @ts-ignore
                (v: any) => !this.error?.email || this.error.emal[0],
            ],
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

            this.store.updateServiceProvider(this.serviceprovider, (success: boolean, data: any) => {
                if (success) {
                    this.$emit('saved');
                } else {
                    this.error = data;
                    //@ts-ignore 
                    this.$refs.form.validate();
                }
            });
        },
    }
});
</script>

<template>
    <v-form ref="form" v-model="valid">
        <v-text-field v-model="serviceprovider.name" :counter="100" :rules="nameRules" label="Name"
            required></v-text-field>
        <v-text-field v-model="serviceprovider.phone" :counter="100" :rules="phoneRules" label="Phone"
            required></v-text-field>
        <v-text-field v-model="serviceprovider.email" :counter="200" :rules="emailRules" label="Email"
            required></v-text-field>

        <v-btn color="error" class="mr-4" @click="$emit('close')">
            Cancel
        </v-btn>

        <v-btn color="success" class="mr-4" @click="Save()">
            Save
        </v-btn>

        <Loader v-if="store.loading"></Loader>

    </v-form>
</template>
