import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ServiceProviders from '../pages/ServiceProviders.vue'

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
      name: 'service-providers',
      component: ServiceProviders
    },
  ]
})

export default router
