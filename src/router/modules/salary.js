import Layout from '@/layout'

export default {
  path: '/salary',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Salary',
      component: () => import('@/views/salary/index'),
      meta: { title: '工资', icon: 'dashboard' }
    }
  ]
}
