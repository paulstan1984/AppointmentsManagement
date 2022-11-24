<script lang="ts">
import { defineComponent } from 'vue'
import TopBarSearch from '@/components/TopBar/TopBarSearch.vue';
import TopBarLatestReservations from '@/components/TopBar/TopBarLatestReservations.vue';
import TopBarProfile from '@/components/TopBar/TopBarProfile.vue';

export default defineComponent({
    components: {
        TopBarSearch, TopBarLatestReservations, TopBarProfile
    },
})
</script>

<template>
    <ul class="navbar-nav ml-auto">

        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
        <li class="nav-item dropdown no-arrow d-sm-none">
            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-search fa-fw"></i>
            </a>
            <!-- Dropdown - Messages -->
            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                aria-labelledby="searchDropdown">
                <TopBarSearch></TopBarSearch>
            </div>
        </li>

        <!-- Nav Item - Alerts -->
        <TopBarLatestReservations/>

        <div class="topbar-divider d-none d-sm-block"></div>

        <!-- Nav Item - User Information -->
        <TopBarProfile/>

    </ul>
</template>