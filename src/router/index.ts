import { createRouter, createWebHistory } from 'vue-router'
import TopHeadlines from '@/views/TopHeadlines.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TopHeadlines
    }
  ]
})

export default router
