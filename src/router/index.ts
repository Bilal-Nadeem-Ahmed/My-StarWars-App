import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Details from '@/views/Details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details,
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } },
  ],
})

export default router
