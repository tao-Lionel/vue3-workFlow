import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import("@/views/setting.vue"),
    meta: {},
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

