
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            year: new Date().getFullYear(),
        }
    },

})
</script>
<template>
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; <a href="https://www.priscilla-consulting.ro" target="_blank">Priscilla Consulting SRL</a> {{year}}</span>
            </div>
        </div>
    </footer>
</template>