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
            email: undefined,
            password: undefined,
            valid: false,
            emailRules: [
                (v: any) => (v || '').length <= 200 || 'A maximum of 200 characters is allowed.',
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
                // @ts-ignore
                (v: any) => !this.error?.email || this.error.email[0],
            ],
            passwordRules: [
                (v: any) => !!v || 'Password is required',
                // @ts-ignore
                (v: any) => !this.error?.password || this.error.password[0],
            ],
        }
    },

    methods: {
        Login() {
            const s = { email: this.email, password: this.password };
            this.appStore.login(s, (success: boolean, data: any) => {
                if (success) {
                    this.appStore.authToken = data;
                    this.$router.push('/');
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
                                            <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                        </div>
                                        <v-form ref="form" v-model="valid" class="user">
                                            <div class="form-group">
                                                <v-text-field v-model="email" @keydown.enter="Login()" :counter="200"
                                                    :rules="emailRules" label="Email" required></v-text-field>
                                            </div>
                                            <div class="form-group">
                                                <v-text-field type="password" v-model="password" @keydown.enter="Login()" :counter="200"
                                                    :rules="passwordRules" label="Password" required></v-text-field>
                                            </div>

                                            <v-btn color="success" class="btn btn-primary btn-user btn-block"
                                                @click="Login()">
                                                Login
                                            </v-btn>

                                        </v-form>

                                        <hr>
                                        <div class="text-center">
                                            <router-link :to="{ name: 'forgotpassword' }" :class="['small']">Forgot Password?</router-link>
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
