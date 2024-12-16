import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import BooksView from '../views/BooksView.vue'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartView,
    },
    {
      path: '/böcker',
      name: 'böcker',
      component: BooksView,
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView,
    },
  ],
})

export default router
