import { createRouter, createWebHistory } from 'vue-router'
import TopHeadlines from '@/views/TopHeadlines.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TopHeadlines',
      component: TopHeadlines
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: () => import('@/views/NewsDetail.vue')
    },
    {
      path: '/history',
      name: 'NewsHistory',
      component: () => import('@/views/NewsHistory.vue')
    }
  ]
})

export default router
