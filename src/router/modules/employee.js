import Layout from '@/layout'

export default {
  path: '/employee',
  name: 'employee',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Employee',
      component: () => import('@/views/employee/index'),
      meta: { title: '员工', icon: 'dashboard', breadcrumb: '员工' }
    },
    {
      path: '/employee/detail/:id?',
      name: 'EmployeeDetail',
      component: () => import('@/views/employee/employeeDetail'),
      hidden: true,
      meta: { title: '员工详情' }
    }

  ]
}
