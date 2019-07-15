import Layout from '@/views/layout/Layout'

const transactionRouter = {
  path: '/transaction',
  component: Layout,
  redirect: '/transaction/delivery',
  name: 'transaction',
  meta: {
    title: '交易',
    icon: 'table'
  },
  children: [
    {
      path: 'all_transaction',
      component: () => import('@/z/SubLayout'),
      name: 'all_transaction',
      meta: { title: '全部交易' },
      children: [
        {
          path: 'sale_bill_manager',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'sale_bill_manager',
          meta: { title: '订单管理' }
        },
        {
          path: 'integral_manager',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'integral_manager',
          meta: { title: '积分管理' }
        },
        {
          path: 'return_bill_manager',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'return_bill_manager',
          meta: { title: '退单管理' }
        },
        {
          path: 'evaluate_manager',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'evaluate_manager',
          meta: { title: '评价管理' }
        }
      ]
    }
  ]
}
export default transactionRouter
