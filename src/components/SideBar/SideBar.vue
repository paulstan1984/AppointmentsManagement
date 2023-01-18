<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/components/SideBar/Logo.vue';
import { appStore } from '@/stores/appStore';

export default defineComponent({
    components: {
        Logo
    },

    data() {
        return {
            appStore: appStore()
        }
    },
})

</script>

<template>
    <ul :class="{ toggled: appStore.menuToggled, 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion': true }">

        <Logo></Logo>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading" v-if="appStore.profile?.role=='admin'">
            Admin area
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item" v-if="appStore.profile?.role=='admin'">
            <router-link :to="{ name: 'providers' }" :class="['nav-link']">
                <i class="fas fa-fw fa-building"></i>
                <span>Service Providers</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" v-if="appStore.profile?.role=='admin'">

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <router-link :to="{ name: 'resources' }" :class="['nav-link']">
                <i class="fas fa-fw fa-chair"></i>
                <span>Phisical Resources</span>
            </router-link>
        </li>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <router-link :to="{ name: 'reservations' }" :class="['nav-link']">
                <i class="fas fa-fw fa-calendar-check"></i>
                <span>Reservations</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle" @click="state.toggleMenu"></button>
        </div>

        <!-- Sidebar Message -->
        <div class="sidebar-card d-none d-lg-flex">
            <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="...">
            <span class="text-center mb-2">Have a nice and productive day!</span>
        </div>
    </ul>
</template>