import Layout from '@/views/layout/Layout'

const vipRouter = {
  path: '/marketing',
  component: Layout,
  redirect: '/marketing/delivery',
  name: 'marketing',
  meta: {
    title: '营销',
    icon: 'table'
  },
  children: [
    {
      path: 'rfm_precision_sales',
      component: () => import('@/z/SubLayout'),
      name: 'rfm_precision_sales',
      meta: { title: 'RFM精准销售' },
      children: [
        {
          path: 'rfm_settings',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'rfm_settings',
          meta: { title: 'RFM客户价值设置' }
        }
      ]
    },
    {
      path: 'consume_visit_settings',
      component: () => import('@/z/SubLayout'),
      name: 'consume_visit_settings',
      meta: { title: '消费回访设置' },
      children: [
        {
          path: 'visit_parameter_settings',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'visit_parameter_settings',
          meta: { title: '回访参数设置' }
        }
      ]
    }
  ]
}
export default vipRouter
