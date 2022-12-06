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
                (v: any) => !!v || 'Name is required',
                // @ts-ignore
                (v: any) => this.store.error == undefined || this.store.error.name[0],
            ],
            phoneRules: [
                (v: any) => !!v || 'Phone is required',
                (v: any) => /\d+/.test(v) || 'Phone must be valid',
                // @ts-ignore
                (v: any) => this.store.error == undefined || this.store.error.phone[0],
            ],
            emailRules: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
                // @ts-ignore
                (v: any) => this.store.error == undefined || this.store.error.emal[0],
            ],
        }
    },

    methods: {
        async Save() {
            //@ts-ignore 
            this.$refs.form.validate();
            console.log(this.valid);
            console.log(this.store.error);

            delete this.store.error;
            console.log(1);
            await this.store.updateServiceProvider(this.serviceprovider);
            console.log(2);
            console.log(this.store.error);


            if (this.store.error == undefined) {
                this.$emit('saved');
                return;
            }

            //@ts-ignore 
            this.$refs.form.validate();

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
