import Layout from '@/views/layout/Layout'

const vipRouter = {
  path: '/vip',
  component: Layout,
  redirect: '/vip/delivery',
  name: 'vip',
  meta: {
    title: '会员',
    icon: 'table'
  },
  children: [
    {
      path: 'vip_manager',
      component: () => import('@/z/SubLayout'),
      name: 'vip_manager',
      meta: { title: '会员管理' },
      children: [
        {
          path: 'vip_list',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_list',
          meta: { title: '会员列表' }
        }
      ]
    },
    {
      path: 'vip_card_manager',
      component: () => import('@/z/SubLayout'),
      name: 'vip_card_manager',
      meta: { title: '会员卡管理' },
      children: [
        {
          path: 'vip_card',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_card',
          meta: { title: '会员卡' }
        },
        {
          path: 'vip_center_ad',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_center_ad',
          meta: { title: '会员中心广告' }
        }
      ]
    },
    {
      path: 'ticket_manager',
      component: () => import('@/z/SubLayout'),
      name: 'ticket_manager',
      meta: { title: '卡卷管理' },
      children: [
        {
          path: 'ticket_list',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'ticket_list',
          meta: { title: '卡卷列表' }
        },
        {
          path: 'give_ticket',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'give_ticket',
          meta: { title: '赠送卡卷' }
        },
        {
          path: 'ticket_write_off',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'ticket_write_off',
          meta: { title: '卡卷核销' }
        },
        {
          path: 'ticket_log',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'ticket_log',
          meta: { title: '卡卷记录' }
        }
      ]
    },
    {
      path: 'vip_belong_manager',
      component: () => import('@/z/SubLayout'),
      name: 'vip_belong_manager',
      meta: { title: '会员归属管理' },
      children: [
        {
          path: 'vip_channel',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_channel',
          meta: { title: '多门店所属' }
        }
      ]
    }
  ]
}
export default vipRouter
