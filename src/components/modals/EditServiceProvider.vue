<script lang = "ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { serviceProvidersStore } from '@/stores/serviceProvidersStore.ts';

export default defineComponent({
    props: ['serviceprovider'],
    emits: ['close', 'saved'],

    data() {
        return {
            store: serviceProvidersStore(),
            valid: false,
            nameRules: [
                // @ts-ignore
                (v: any) => this.store.error.name[0],
                (v: any) => !!v || 'Name is required',
                (v: any) => v.length <= 10 || 'Name must be less than 10 characters',

            ],
            phoneRules: [
                // @ts-ignore
                (v: any) => this.store.error.phone[0],
                (v: any) => !!v || 'Phone is required',
                (v: any) => /\d+/.test(v) || 'Phone must be valid',
            ],
            emailRules: [
                // @ts-ignore
                (v: any) => this.store.error.email[0],
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },

    methods: {
        Save() {
            if (this.valid == null) {
                this.store.updateServiceProvider(this.serviceprovider, (success: boolean, data: any) => {
                    if (success) {
                        this.$emit('saved');
                    }
                    //@ts-ignore 
                    this.$refs.form.validate();
                });
            }
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
    </v-form>
</template>
