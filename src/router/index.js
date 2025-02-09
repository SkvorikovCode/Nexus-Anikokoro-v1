import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AnimeDetails from '../views/AnimeDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/anime/:id',
      name: 'anime-details',
      component: AnimeDetails
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router
