import {createRouter, createWebHashHistory} from 'vue-router'

import Layout from '../views/Main.vue'
import Login from '../views/login/index.vue'

const routes = [
  {
    path:'/',
    component: Layout
  },
  {
    path:'/login',
    component: Login
  }
]

const router = createRouter({
  routes,
  history:createWebHashHistory()
})

export default router

