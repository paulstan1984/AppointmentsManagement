<script lang="ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { appStore } from '@/stores/appStore.ts';
import Loader from '@/components/shared/Loader.vue';

export default defineComponent({
    components: {
        Loader
    },

    data() {
        return {
            appStore: appStore(),
        }
    },

    methods: {
        Logout() {
            const s = { token: this.appStore.authToken };
            this.appStore.logout(s, (success: boolean, data: any) => {
                this.$router.push('/login');
            });
        },
    },

    mounted() {
        if (!this.appStore.profile) {
            this.appStore.getProfile(function (success: boolean, data: any) { })
        }
    }
})
</script>

<template>

    <li class="nav-item dropdown no-arrow">
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ appStore.profile?.name }}</span>
            <img class="img-profile rounded-circle" src="img/undraw_profile.svg">
        </a>
        <!-- Dropdown - User Information -->
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a class="dropdown-item" href="#">
                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
            </a>
            <a class="dropdown-item" href="#">
                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </a>
        </div>
    </li>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" type="button" data-dismiss="modal" @click="Logout()">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>