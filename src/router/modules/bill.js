import Layout from '@/views/layout/Layout'

/**
 * 货品流转
 */
const billRouter = {
  path: '/bill',
  component: Layout,
  redirect: '/bill/delivery',
  name: 'Bill',
  meta: {
    title: '货品流转',
    icon: 'table',
  },
  children: [
    {
      path: 'delivery',
      component: () => import('@/z/bill/delivery'),
      name: 'delivery',
      hidden: true,
      meta: {title: '配货'}
    },
    {
      path: 'transfer_list',
      component: () => import('@/z/bill/transfer/transfer_list'),
      name: 'transfer_list',
      meta: {title: '调拨'}
    },
    {
      path: 'transfer_create',
      component: () => import('@/z/bill/transfer/transfer_detail'),
      name: 'transfer_detail',
      hidden: true,
      meta: {title: '调拨-新增'}
    },
    {
      path: 'transfer_update/:id',
      component: () => import('@/z/bill/transfer/transfer_detail'),
      name: 'transfer_update',
      hidden: true,
      meta: {title: '调拨-修改'}
    },
    {
      path: 'replenishment',
      component: () => import('@/z/bill/index'),
      name: 'replenishment',
      hidden: true,
      meta: {title: '补货'}
    }
  ]
}
export default billRouter
