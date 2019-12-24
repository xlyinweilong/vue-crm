import Layout from '@/views/layout/Layout'

const nursingRouter = {
  path: '/nursing',
  component: Layout,
  redirect: '/nursing/platform_settings/company_info',
  name: 'nursing',
  meta: {
    title: '焕新服务',
    icon: 'table',
    power: 'manage'
  },
  children: [
    {
      path: 'settings',
      component: () => import('@/z/SubLayout'),
      name: 'settings',
      meta: {title: '配置', power: 'manage_platform'},
      children: [
        {
          path: 'sale',
          component: () => import('@/z/nursing/settings/sale/index'),
          name: 'sale',
          meta: {title: '消费得焕新币', power: 'manage_platform_company'}
        },
        {
          path: 'recharge',
          component: () => import('@/z/nursing/settings/recharge/index'),
          name: 'recharge',
          meta: {title: '充值焕新币', power: 'manage_platform_ui'}
        },
        {
          path: 'category',
          component: () => import('@/z/nursing/settings/category/index'),
          name: 'category',
          meta: {title: '换新品类', power: 'manage_platform_ui'}
        }
      ]
    },
    {
      path: 'query',
      component: () => import('@/z/SubLayout'),
      name: 'query',
      meta: {title: '查询', power: 'manage_platform'},
      children: [
        {
          path: 'bill_detail/:id',
          component: () => import('@/z/nursing/query/bill/detail'),
          name: 'bill_detail',
          hidden: true,
          meta: {title: '单据明细'}
        },
        {
          path: 'bill',
          component: () => import('@/z/nursing/query/bill/index'),
          name: 'bill',
          meta: {title: '单据', power: 'manage_platform_company'}
        },
        {
          path: 'settle',
          component: () => import('@/z/nursing/query/settle/index'),
          name: 'settle',
          meta: {title: '结算', power: 'manage_platform_company'}
        },
        {
          path: 'log',
          component: () => import('@/z/nursing/query/log/index'),
          name: 'log',
          meta: {title: '焕新币交易', power: 'manage_platform_company'}
        }
      ]
    }
  ]
}
export default nursingRouter
