<script lang = "ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { serviceProvidersStore } from '@/stores/serviceProvidersStore.ts';

export default defineComponent({
    props: ['serviceprovider'],
    emits: ['close'],

    data() {
        return {
            store: serviceProvidersStore(),

            valid: false,
            nameRules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            phoneRules: [
                (v: any) => !!v || 'Phone is required',
                (v: any) => /{\d}+/.test(v) || 'Phone must be valid',
            ],
            emailRules: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },

    methods: {
        Save() {
            if (!this.valid) {
                this.store.updateServiceProvider(this.serviceprovider);
                this.$emit('close');
            }
        }
    }
});
</script>

<template>
    <v-form ref="form" v-model="valid">
        <v-text-field v-model="serviceprovider.name" :counter="100" :rules="nameRules" label="Name"
            required></v-text-field>
        <v-text-field v-model="serviceprovider.phone" :counter="10" :rules="phoneRules" label="Phone"
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
