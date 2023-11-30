import Layout from '@/layout'

export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限', icon: 'dashboard' }
    }
  ]
}
