import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import ServiceProviders from '@/pages/ServiceProviders.vue'
import PhisicalResources from '@/pages/PhisicalResources.vue'
import Reservations from '@/pages/Reservations.vue'
import Login from '@/pages/Login.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import axios from 'axios';
// @ts-ignore
import config from '@/stores/environment.ts';

//define global ajax interceptors
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status == 403 || error.response.status == 401) {
    window.location.href = config.APPBaseUrl + 'login';
  }
  return Promise.reject(error);
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/service-providers',
      name: 'providers',
      component: ServiceProviders
    },
    {
      path: '/phisical-resources',
      name: 'resources',
      component: PhisicalResources
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservations
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/forgot-password',
      name: 'forgotpassword',
      component: ForgotPassword
    },

    {
      path: '/reset-password/:remember_token',
      name: 'resetpassword',
      component: ResetPassword
    },
  ]
})

export default router
