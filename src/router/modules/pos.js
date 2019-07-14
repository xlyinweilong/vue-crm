import Layout from '@/views/layout/Layout'

/**
 * POS
 */
const posRouter = {
  path: '/pos',
  component: Layout,
  redirect: '/pos/cash',
  name: 'pos',
  meta: {
    title: 'POS',
    icon: 'table',
    power: 'user_'
  },
  children: [
    {
      path: 'cash',
      component: () => import('@/z/pos/cash'),
      name: 'cash',
      meta: {title: '收银'}
    },
    {
      path: 'back',
      component: () => import('@/z/pos/back'),
      name: 'back',
      meta: {title: '退货'}
    }
  ]
}
export default posRouter
