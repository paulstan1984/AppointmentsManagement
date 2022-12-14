<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['tt'],

    data() {
        return {
            days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        }
    },

    methods: {
        dayliTimetable(day: string): string | undefined {
            if (!this.tt) return undefined;
            let dayTT = [];
            for (let i = 0; i < this.tt[day].length; i = i + 2) {
                dayTT.push(this.tt[day][i] + '-' + this.tt[day][i + 1]);
            }

            if (dayTT.length > 0) {
                return dayTT.join(', ');
            }

            return undefined;
        },

        weekTimetable(): string {
            let retArray = [];

            for (let day of this.days) {

                const dailyTT = this.dayliTimetable(day);

                if (dailyTT) {
                    retArray.push(day + ': ' + dailyTT);
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
