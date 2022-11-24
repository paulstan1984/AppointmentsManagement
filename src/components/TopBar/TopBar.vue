<script lang="ts">
import { defineComponent } from 'vue'
import TopBarSearch from '@/components/TopBar/TopBarSearch.vue';
import TopBarNav from '@/components/TopBar/TopBarNav.vue';

import { useAppStore } from '@/stores/appStore';

export default defineComponent({
    components: {
        TopBarSearch,
        TopBarNav,
    },

    data() {
        return {
            state: useAppStore()
        }
    },

})
</script>

<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        <!-- Sidebar Toggle (Topbar) -->
        <button class="btn btn-link d-md-none rounded-circle mr-3" @click="state.toggleMenu">
            <i class="fa fa-bars"></i>
        </button>

        <!-- Topbar Search -->
        <div class="d-none d-sm-block">
            <TopBarSearch />
        </div>

        <!-- Topbar Navbar -->
        <TopBarNav />

    </nav>
</template>