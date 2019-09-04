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
          component: () => import('@/z/transfer/sale_bill_list'),
          name: 'sale_bill_manager',
          meta: { title: '销售管理' }
        },
        {
          path: 'integral_manager',
          component: () => import('@/z/transfer/integral_list'),
          name: 'integral_manager',
          meta: { title: '积分管理' }
        },
        {
          path: 'evaluate_manager',
          component: () => import('@/z/transfer/evaluate/index'),
          name: 'evaluate_manager',
          meta: { title: '评价管理' }
        }
      ]
    }
  ]
}
export default transactionRouter
