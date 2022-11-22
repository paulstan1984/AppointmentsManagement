<script lang="ts">
import { defineComponent } from 'vue'
import SidebarBrand from './SidebarBrand.vue';

export default defineComponent({
    components: {
        SidebarBrand
    },

    methods: {
        toggleMenu: function () {
            this.toggled = !this.toggled;
        }
    },

    data() {
        return {
            toggled: false
        }
    },
})

</script>

<template>
    <ul :class="{ toggled: toggled, 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion': true }">

        <SidebarBrand></SidebarBrand>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Admin area
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="fas fa-fw fa-cog"></i>
                <span>Service Providers</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Logged in service provider
        </div>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="fas fa-fw fa-wrench"></i>
                <span>Phisical Resources</span>
            </a>
        </li>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="fas fa-fw fa-folder"></i>
                <span>Reservations</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle" @click="toggleMenu"></button>
        </div>

        <!-- Sidebar Message -->
        <div class="sidebar-card d-none d-lg-flex">
            <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="...">
            <span class="text-center mb-2">Have a nice and productive day!</span>
        </div>
    </ul>
</template>