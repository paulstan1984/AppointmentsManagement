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
            error: undefined,
            password: undefined,
            valid: false,
            passwordRules: [
                (v: any) => !!v || 'Password is required',
                // @ts-ignore
                (v: any) => !this.error?.password || this.error.password[0],
            ],
        }
    },

    computed: {
        remember_token() {
            // We will see what `params` is shortly
            return this.$route.params.remember_token
        },
    },

    methods: {
        ResetPassword() {
            const s = { remember_token: this.remember_token, password: this.password };
            this.appStore.resetPassword(s, (success: boolean, data: any) => {
                if (success) {
                    this.$router.push('/login');
                } else {
                    this.error = data;
                    //@ts-ignore 
                    this.$refs.form.validate();
                }
            });
        },
    },
})
</script>

<template>
    <div class="bg-gradient-primary">
        <div class="container">

            <!-- Outer Row -->
            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Appointments Management</h1>
                                            <h1 class="h4 text-gray-900 mb-4">Reset Password</h1>
                                        </div>
                                        <v-form ref="form" v-model="valid" class="user">
                                            <div class="form-group">
                                                <v-text-field type="password" v-model="password"
                                                    @keydown.enter="ResetPassword()" :counter="200"
                                                    :rules="passwordRules" label="Password" required></v-text-field>
                                            </div>

                                            <v-btn color="success" class="btn btn-primary btn-user btn-block"
                                                @click="ResetPassword()">
                                                Reset Password
                                            </v-btn>

                                        </v-form>

                                        <hr>
                                        <div class="text-center">
                                            <router-link :to="{ name: 'login' }" :class="['small']">Back to
                                                login</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <Loader v-if="appStore.loading"></Loader>

            </div>
        </div>
    </div>
</template>
