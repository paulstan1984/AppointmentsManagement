<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from '@/components/SideBar/SideBar.vue';
import TopBar from '@/components/TopBar/TopBar.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollTop from '@/components/Footer/ScrollTop.vue';
import Loader from '@/components/shared/Loader.vue';
import ErrorModal from '@/components/shared/ErrorModal.vue';
import EditServiceProvider from '@/components/modals/EditServiceProvider.vue';

/**
 * Todo:
 * map between users and providers / admin -> this can be done at the database level
 * continue with the public app
 */

// @ts-ignore
import { serviceProviderStore } from '@/stores/serviceProviderStore.ts';
// @ts-ignore
import { appStore } from '@/stores/appStore.ts';
import config from '@/stores/environment';

export default defineComponent({
    components: {
        SideBar,
        TopBar,
        Footer,
        ScrollTop,
        Loader,
        ErrorModal,
        EditServiceProvider
    },

    data() {
        return {
            appStore: appStore(),
            store: serviceProviderStore(),
            showEditModal: false,
            selectedServiceProvider: undefined
        }
    },

    methods: {
        Edit(s: any) {
            this.selectedServiceProvider = Object.assign({}, s);
            this.showEditModal = true;
        },

        Delete(s: any) {
            if (confirm('Are you sure?')) {
                this.store.delete(s, (success: boolean, data: any) => {
                    if (success) {
                        this.store.search();
                    } else {
                        this.store.error = data;
                        //@ts-ignore 
                        setTimeout(() => delete this.store.error, config.errorDisplayTimeout);
                    }
                });
            }
        },

        Cancel() {
            this.showEditModal = false;
        },

        Saved() {
            this.showEditModal = false;
            this.store.search();
        }
    },

    mounted() {
        this.appStore.serviceProviderURL = config.ServiceProvudersURL;
        this.store.search();
    }

})
</script>

<template>
    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <SideBar></SideBar>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <TopBar />
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Service Providers</h1>

                        <div class="d-sm-flex justify-content-end">
                            <a @click="Edit({})"
                                class="ms-2 d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    class="fas fa-plus"></i> Add</a>

                            <a @click="store.search()"
                                class="ms-2 d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    class="fas fa-sync-alt"></i> Reload</a>
                        </div>
                    </div>

                    <!-- Content Row -->
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <tr v-for="item in store.searchResults?.results">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.phone }}</td>
                                        <td>{{ item.email }}</td>
                                        <td>
                                            <a class="btn btn-primary" @click="Edit(item)"><i
                                                    class="fas fa-edit">Edit</i></a>
                                            <a class="ms-2 btn btn-danger"><i class="fas fa-trash"
                                                    @click="Delete(item)">Delete</i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <Footer />
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <ScrollTop />

    <Loader v-if="store.loading"></Loader>
    <ErrorModal v-if="store.error" :error="store.error"></ErrorModal>

    <v-dialog v-model="showEditModal">
        <v-card class="p-3">
            <EditServiceProvider :serviceprovider="selectedServiceProvider" @close="Cancel()" @saved="Saved()">
            </EditServiceProvider>
        </v-card>
    </v-dialog>


</template>
