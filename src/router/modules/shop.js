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
          path: 'goods',
          component: () => import('@/z/shop/config/goods/index'),
          name: 'goods',
          meta: {title: '商品管理', power: 'transaction_all_goods'}
        },
        {
          path: 'goods_detail/:id',
          component: () => import('@/z/shop/config/goods/detail'),
          name: 'goods_detail',
          hidden: true,
          meta: {title: '商品管理', power: 'transaction_all_goods'}
        },
        {
          path: 'goods_category',
          component: () => import('@/z/shop/config/goods_category/index'),
          name: 'goods_category',
          meta: {title: '商品分类', power: 'manage_platform_company'}
        },
        {
          path: 'goods_category2',
          component: () => import('@/z/shop/config/goods_category2/index'),
          name: 'goods_category2',
          meta: {title: '商品二级分类', power: 'manage_platform_company'}
        },
        {
          path: 'recommend_search',
          component: () => import('@/z/shop/config/recommend_search/index'),
          name: 'recommend_search',
          meta: {title: '推荐搜索', power: 'manage_platform_company'}
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
