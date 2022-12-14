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
            openRules: [
                // @ts-ignore
                (v: any) => !this.error?.open || this.error.open[0],
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

        AddScheduleUnit() {
            if (!this.entity.schedule_units) {
                this.entity.schedule_units = [];
            }
            this.entity.schedule_units.push({ key: '', value: '' })
        },

        DeleteScheduleUnit(su: any) {
            const index = this.entity.schedule_units.indexOf((e: any) => e.key == su.key);
            if (index != -1) {
                this.entity.schedule_units.splice(index, 1);
            }
        },

        AddTimetable(t: any) {
            if (!t.timetable) {
                t.timetable = [];
            }
            t.timetable?.push({ start: '', end: '' });
        },

        DeleteTimetable(t: any, el: any) {
            const index = t.timetable.findIndex((e: any) => e.start == el.start);
            if (index != -1) {
                t.timetable.splice(index, 1);
            }
        }
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
        <v-text-field v-model="entity.name" @keydown.enter="Save()" :counter="100" :rules="nameRules" label="Name"
            required></v-text-field>
        <v-textarea v-model="entity.description" :rules="descriptionRules" label="Description"></v-textarea>
        <v-select v-model="entity.schedule_type" :items="scheduleTypes" label="Schedule Type" :rules="scheduleTypeRules"
            item-title="name" item-value="key"></v-select>
        <v-checkbox v-model="entity.open" label="Open" :rules="openRules"></v-checkbox>

        <v-autocomplete v-model="entity.service_provider_id" :items="spStore.searchResults?.results"
            label="Service Provider" item-title="name" item-value="id" :rules="serviceProviderRules"
            v-model:search="searchServiceProvider"></v-autocomplete>

        <strong>Schedule Units</strong>
        <v-row>
            <v-col>
                <v-btn color="success" class="mr-4 float-end" @click="AddScheduleUnit()">
                    <i class="fa fa-plus"></i>
                </v-btn>
            </v-col>

        </v-row>
        <v-row no-gutters v-for="(e in entity.schedule_units">
            <v-col cols="12" sm="5">
                <v-text-field v-model="e.key" label="Unit" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="5">
                <v-text-field v-model="e.value" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
                <v-btn color="error" class="ml-4 mt-3" @click="DeleteScheduleUnit(e)">
                    <i class="fa fa-trash"></i>
                </v-btn>
            </v-col>
        </v-row>

        <strong>Weekly Timetable</strong>
        <v-row no-gutters v-for="(e in entity.weekly_timetable">
            <v-col cols="12" sm="4">
                <v-label>{{ e.day }}</v-label>

                <v-btn color="success" class="ml-4 mt-3" @click="AddTimetable(e)">
                    <i class="fa fa-plus"></i>
                </v-btn>
            </v-col>
            <v-col cols="12" sm="8">
                <v-row no-gutters v-for="(t in e.timetable">
                    <v-text-field type="number" v-model="t.start" label="Start" required></v-text-field>
                    <v-text-field type="number" v-model="t.end" label="End" required></v-text-field>
                    <v-btn color="error" class="ml-4 mt-3" @click="DeleteTimetable(e, t)">
                        <i class="fa fa-trash"></i>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>

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
