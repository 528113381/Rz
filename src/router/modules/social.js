import Layout from '@/layout'

export default {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'social',
      name: 'Social',
      component: () => import('@/views/social/index'),
      meta: { title: '社保', icon: 'dashboard' }
    }
  ]
}
