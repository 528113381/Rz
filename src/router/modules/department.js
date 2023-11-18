import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'department',
      name: 'Department',
      component: () => import('@/views/department/index'),
      meta: { title: '组织', icon: 'dashboard' }
    }
  ]
}
