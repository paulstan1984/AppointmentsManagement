<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:['error']
})
</script>

<template>
    <div class="card py-3 border-left-danger error-modal">
        <div class="card-body">
            {{error}}
        </div>
    </div>
</template>

<style scoped>
div.error-modal {
    position: fixed;
    top:50%;
    left:50%;
    z-index: 999;
    background-color: #FFFFFF;
}
</style>