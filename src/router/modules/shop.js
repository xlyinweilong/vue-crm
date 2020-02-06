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
          path: 'size',
          component: () => import('@/z/shop/config/size/index'),
          name: 'size',
          meta: {title: '尺码排序', power: 'transaction_all_goods'}
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
          path: 'goods_brand',
          component: () => import('@/z/shop/config/goods_brand/index'),
          name: 'goods_brand',
          meta: {title: '商品品牌', power: 'manage_platform_company'}
        },
        {
          path: 'goods_category',
          component: () => import('@/z/shop/config/goods_category/index'),
          name: 'goods_category',
          meta: {title: '商品分类', power: 'manage_platform_company'}
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
      path: 'business',
      component: () => import('@/z/SubLayout'),
      name: 'business',
      meta: {title: '业务处理', power: 'manage_platform'},
      children: [
        {
          path: 'order_send',
          component: () => import('@/z/shop/business/order/index'),
          name: 'order_send',
          meta: {title: '订单发货', power: 'manage_platform_company'}
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
