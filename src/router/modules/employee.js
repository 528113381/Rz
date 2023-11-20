import Layout from '@/layout'

export default {
  path: '/employee',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Employee',
      component: () => import('@/views/employee/index'),
      meta: { title: '员工', icon: 'dashboard' }
    }
  ]
}
