<script lang = "ts">
import { defineComponent } from 'vue'
import Loader from '@/components/shared/Loader.vue';

// @ts-ignore
import { entitiesStore } from '@/stores/entitiesStore';
import config from '@/stores/environment';

export default defineComponent({

    components: {
        Loader
    },

    props: ['entity'],
    emits: ['close', 'saved'],

    data() {
        return {
            store: entitiesStore(),
            error: undefined,
            valid: false,
            scheduleTypes: ['hour', 'minute'],
            nameRules: [
                (v: any) => (v || '').length <= 50 || 'A maximum of 50 characters is allowed.',
                (v: any) => !!v || 'Name is required',
                // @ts-ignore
                (v: any) => !this.error?.name || this.error.name[0],
            ],
            descriptionRules: [
                (v: any) => (v || '').length <= 500 || 'A maximum of 500 characters is allowed.',
                // @ts-ignore
                (v: any) => !this.error?.description || this.error.description[0],
            ],
            scheduleTypeRules: [
                // @ts-ignore
                (v: any) => this.scheduleTypes.findIndex(e => e == v) !== -1 || 'A maximum of 500 characters is allowed.',
                // @ts-ignore
                (v: any) => !this.error?.description || this.error.description[0],
            ],
            emailRules: [
                (v: any) => (v || '').length <= 200 || 'A maximum of 200 characters is allowed.',
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

            this.store.store(this.entity, (success: boolean, data: any) => {
                if (success) {
                    this.$emit('saved');
                } else {
                    this.error = data;
                    //@ts-ignore 
                    this.$refs.form.validate();
                }
            });
        }
    },

    mounted() {
        this.store.resourceURL = config.PhisicalResourcesURL;
        if (this.entity.open == 1) {
            this.entity.open = true;
        } else {
            this.entity.open = false;
        }
        console.log(this.entity);
    }
});
</script>

<template>
    <v-form ref="form" v-model="valid">
        <v-text-field v-model="entity.name" @keydown.enter="Save()" :counter="100" :rules="nameRules" label="Name"
            required></v-text-field>
        <v-textarea v-model="entity.description" :rules="descriptionRules" label="Description"></v-textarea>
        <v-select v-model="entity.schedule_type" :items="scheduleTypes" label="Schedule Type"
            :rules="scheduleTypeRules"></v-select>

        <v-checkbox v-model="entity.open" :label="`Checkbox 1: ${entity.open.toString()}`"></v-checkbox>

        <v-btn color="error" class="mr-4" @click="$emit('close')">
            Cancel
        </v-btn>

        <v-btn color="success" class="mr-4" @click="Save()">
            Save
        </v-btn>

        <Loader v-if="store.loading"></Loader>

    </v-form>
</template>
