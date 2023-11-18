import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'approval',
      name: 'Approval',
      component: () => import('@/views/approval/index'),
      meta: { title: '审批', icon: 'dashboard' }
    }
  ]
}
