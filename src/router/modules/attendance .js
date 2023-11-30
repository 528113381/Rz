import Layout from '@/layout'

export default {
  path: '/attendance',
  name: 'attendance',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Attendance',
      component: () => import('@/views/attendance/index'),
      meta: { title: '考勤', icon: 'dashboard' }
    }
  ]
}
