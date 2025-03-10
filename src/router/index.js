import { createRouter, createWebHistory } from 'vue-router'
import TimeLine from '../components/TimeLine.vue'

const routes = [
  {
    path: '/', 
    name: 'TimeLine',
    component: TimeLine
  }
  // ... any other routes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
