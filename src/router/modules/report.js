import Layout from '@/views/layout/Layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: '/report/delivery',
  name: 'report',
  meta: {
    title: '报表',
    icon: 'table',
    power: 'report'
  },
  children: [
    {
      path: 'vip',
      component: () => import('@/z/SubLayout'),
      name: 'vip',
      meta: {title: '会员', power: 'report_vip'},
      children: [
        {
          path: 'vip_recommend_report',
          component: () => import('@/z/report/vip/recommend'),
          name: 'vip_recommend_report',
          meta: {title: '会员拉新报表'}
        }
      ]
    },
    {
      path: 'order_report',
      component: () => import('@/z/report/shop_order/index'),
      name: 'order_report',
      meta: {title: '商城订单', power: 'report_order'}
    },
    {
      path: 'finance_report',
      component: () => import('@/z/SubLayout'),
      name: 'finance_report',
      meta: {title: '财务报表', power: 'report_finance'},
      children: [
        {
          path: 'shop_order',
          component: () => import('@/z/report/shop_order/list'),
          name: 'shop_order',
          meta: {title: '商城订单'}
        },
        {
          path: 'pay_ticket',
          component: () => import('@/z/report/shop_order/list'),
          name: 'pay_ticket',
          meta: {title: '支付卡卷'}
        }
      ]
    }
  ]
}
export default reportRouter
