import Layout from '@/views/layout/Layout'

/**
 * 促销活动
 */
const activityRouter = {
  path: '/activity',
  component: Layout,
  redirect: '/activity/list',
  name: 'activity',
  meta: {
    title: '促销活动',
    icon: 'table',
    power: 'user_'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/z/activity/list'),
      name: 'list',
      meta: {title: '促销活动'}
    },
    {
      path: 'activity_create',
      component: () => import('@/z/activity/detail'),
      name: 'activity_create',
      hidden: true,
      meta: {title: '促销活动-新增'}
    },
    {
      path: 'activity_update/:id',
      component: () => import('@/z/activity/detail'),
      name: 'activity_update',
      hidden: true,
      meta: {title: '促销活动-修改'}
    },
  ]
}
export default activityRouter
