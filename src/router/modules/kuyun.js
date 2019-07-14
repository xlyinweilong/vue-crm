import Layout from '@/views/layout/Layout'

/**
 * 酷云商
 */
const kuyunRouter = {
  path: '/kuyun',
  component: Layout,
  redirect: '/kuyun/list',
  name: 'kuyun',
  meta: {
    title: '酷云商',
    icon: 'table',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/z/kuyun/plan/plan_list'),
      name: 'list',
      meta: {title: '酷云商-计划'}
    },
    {
      path: 'goods_list/:id',
      component: () => import('@/z/kuyun/plan/plan_goods_list'),
      name: 'goods_list',
      hidden: true,
      meta: {title: '计划货品'}
    },
    {
      path: 'rs_list/:id',
      component: () => import('@/z/kuyun/plan/plan_rs_list'),
      name: 'goods_list',
      hidden: true,
      meta: {title: '计划结果'}
    }
  ]
}
export default kuyunRouter
