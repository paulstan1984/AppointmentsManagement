<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['tt'],

    data() {
        return {
            days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            timeTable: ''
        }
    },

    methods: {
        dayliTimetable(timetable: []): string | undefined {
            let dayTT = [];
            for (let timeinterval of timetable) {
                //@ts-ignore
                dayTT.push(timeinterval.start + '-' + timeinterval.end);
            }

            if (dayTT.length > 0) {
                return dayTT.join(', ');
            }

            return undefined;
        },

        weekTimetable(): string {
            let retArray: any[] = [];

            if (!this.tt) return '';

            for (let item of this.tt) {

                const dailyTT = this.dayliTimetable(item.timetable);

                if (dailyTT) {
                    retArray.push(item.day + ': ' + dailyTT);
                }
            }

            return retArray.join('; ');
        }
    }
})
</script>

<template>
    <div class="card border-left-info p-0 m-0">
        <div class="card-body p-1 m-0">
            {{ weekTimetable() }}
        </div>
    </div>
</template>
