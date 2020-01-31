import Layout from '@/views/layout/Layout'

const transactionRouter = {
  path: '/transaction',
  component: Layout,
  redirect: '/transaction/delivery',
  name: 'transaction',
  meta: {
    title: '交易',
    icon: 'table',
    power: 'transaction'
  },
  children: [
    {
      path: 'all_transaction',
      component: () => import('@/z/SubLayout'),
      name: 'all_transaction',
      meta: {title: '全部交易', power: 'transaction_all'},
      children: [
        {
          path: 'sale_bill_manager',
          component: () => import('@/z/transfer/sale_bill_list'),
          name: 'sale_bill_manager',
          meta: {title: '销售管理', power: 'transaction_all_sale'}
        },
        {
          path: 'integral_manager',
          component: () => import('@/z/transfer/integral/index'),
          name: 'integral_manager',
          meta: {title: '积分管理', power: 'transaction_all_integral'}
        },
        {
          path: 'evaluate_manager',
          component: () => import('@/z/transfer/evaluate/index'),
          name: 'evaluate_manager',
          meta: {title: '评价管理', power: 'transaction_all_evaluate'}
        },
        {
          path: 'complaint_manager',
          component: () => import('@/z/transfer/complaint/index'),
          name: 'complaint_manager',
          meta: {title: '投诉建议', power: 'transaction_all_complaint'}
        }
      ]
    }
  ]
}
export default transactionRouter
