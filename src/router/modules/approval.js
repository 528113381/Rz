import Layout from '@/layout'

export default {
  path: '/approval',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Approval',
      component: () => import('@/views/approval/index'),
      meta: { title: '审批', icon: 'dashboard' }
    }
  ]
}
