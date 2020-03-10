import Layout from '@/views/layout/Layout'

const liveRouter = {
  path: '/live',
  component: Layout,
  redirect: '/manage/platform_settings/company_info',
  name: 'live',
  meta: {
    title: '直播',
    icon: 'table',
    power: 'manage'
  },
  children: [
    {
      path: 'room',
      component: () => import('@/z/live/room/list'),
      name: 'room',
      meta: {title: '直播房间', power: 'manage_platform'}
    }
  ]
}
export default liveRouter
