import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import ServiceProviders from '@/pages/ServiceProviders.vue'
import PhisicalResources from '@/pages/PhisicalResources.vue'
import Reservations from '@/pages/Reservations.vue'

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
  ]
})

export default router
