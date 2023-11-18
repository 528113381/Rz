import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限', icon: 'dashboard' }
    }
  ]
}
