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
            spStore: entitiesStore(),
            error: undefined,
            valid: false,
            scheduleTypes: [
                { key: 'hour', name: 'Hour' },
                { key: 'minute', name: 'Minute' }
            ],
            service_providers: [{ id: 1, title: 'a' }, { id: 2, title: 'b' }],
            searchServiceProvider: '',
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
                (v: any) => this.scheduleTypes.findIndex(e => e.key == v) !== -1 || 'A maximum of 500 characters is allowed.',
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
        }
    },

    mounted() {
        this.store.resourceURL = config.PhisicalResourcesURL;
        this.spStore.resourceURL = config.ServiceProvudersURL;
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
        <v-text-field v-model="entity.name" @keydown.enter="Save()" :counter="100" :rules="nameRules" label="Name"
            required></v-text-field>
        <v-textarea v-model="entity.description" :rules="descriptionRules" label="Description"></v-textarea>
        <v-select v-model="entity.schedule_type" :items="scheduleTypes" label="Schedule Type" :rules="scheduleTypeRules"
            item-title="name" item-value="key"></v-select>
        <v-checkbox v-model="entity.open" label="Open"></v-checkbox>

        <v-autocomplete v-model="entity.service_provider_id" :items="spStore.searchResults?.results"
            label="Service Provider" item-title="name" item-value="id"
            v-model:search="searchServiceProvider"></v-autocomplete>

        <v-row no-gutters v-for="(e in entity.schedule_units">
            <v-col cols="12" sm="6">
                <v-text-field v-model="e.key" label="Unit" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="e.value" label="Name" required></v-text-field>
            </v-col>
        </v-row>

        Todo:
        - schedule_units
        - weekly_timetable
        <v-btn color="error" class="mr-4" @click="$emit('close')">
            Cancel
        </v-btn>

        <v-btn color="success" class="mr-4" @click="Save()">
            Save
        </v-btn>

        <Loader v-if="store.loading"></Loader>

        <pre>{{ entity }}</pre>
    </v-form>
</template>
