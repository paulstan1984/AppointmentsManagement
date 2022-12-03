<script lang = "ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['serviceprovider'],

    data() {
        return {
            valid: false,
            nameRules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            phoneRules: [
                (v: any) => !!v || 'Phone is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            emailRules: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
});
</script>

<template>
    <pre>
        {{serviceprovider}}
    </pre>

</template>
