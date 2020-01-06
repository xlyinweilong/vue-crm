import Layout from '@/views/layout/Layout'

const shopRouter = {
  path: '/shop',
  component: Layout,
  redirect: '/shop/platform_settings/company_info',
  name: 'shop',
  meta: {
    title: '商城',
    icon: 'table',
    power: 'manage'
  },
  children: [
    {
      path: 'config',
      component: () => import('@/z/SubLayout'),
      name: 'config',
      meta: {title: '商城配置', power: 'manage_platform'},
      children: [
        {
          path: 'theme',
          component: () => import('@/z/shop/config/theme/index'),
          name: 'theme',
          meta: {title: '主题设计'}
        },
        {
          path: 'components',
          component: () => import('@/z/shop/config/components/index'),
          name: 'components',
          hidden: true,
          meta: {title: '组件设计', power: 'manage_platform_company'}
        }
      ]
    },
    {
      path: 'settings',
      component: () => import('@/z/SubLayout'),
      name: 'settings',
      meta: {title: '首页设计', power: 'manage_platform'},
      children: [
        {
          path: 'sale',
          component: () => import('@/z/nursing/settings/sale/index'),
          name: 'sale',
          meta: {title: '组件定义', power: 'manage_platform_company'}
        },
        {
          path: 'recharge',
          component: () => import('@/z/nursing/settings/recharge/index'),
          name: 'recharge',
          meta: {title: '首页排版', power: 'manage_platform_ui'}
        }
      ]
    }
  ]
}
export default shopRouter
