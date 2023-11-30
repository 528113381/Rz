import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import approval from './modules/approval'
import attendance from './modules/attendance '
import department from './modules/department'
import employee from './modules/employee'
import permission from './modules/permission'
import role from './modules/role'
import salary from './modules/salary'
import social from './modules/social'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]

// 动态路由 需要权限才能访问的路由
export const asyncRoutes = [
  department,
  role,
  employee,
  permission,
  attendance,
  approval,
  salary,
  social
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
