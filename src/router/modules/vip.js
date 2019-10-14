import Layout from '@/views/layout/Layout'

const vipRouter = {
  path: '/vip',
  component: Layout,
  redirect: '/vip/delivery',
  name: 'vip',
  meta: {
    title: '会员',
    icon: 'table',
    power: 'vip'
  },
  children: [
    {
      path: 'vip_manager',
      component: () => import('@/z/SubLayout'),
      name: 'vip_manager',
      meta: {title: '会员管理', power: 'vip_manage'},
      children: [
        {
          path: 'vip_list',
          component: () => import('@/z/vip/vip_manager/vip_list'),
          name: 'vip_list',
          meta: {title: '会员列表', power: 'vip_manage_list'}
        }
      ]
    },
    {
      path: 'vip_card_manager',
      component: () => import('@/z/SubLayout'),
      name: 'vip_card_manager',
      meta: {title: '会员卡管理', power: 'vip_grade'},
      children: [
        {
          path: 'vip_card',
          component: () => import('@/z/vip/grade/grade_list'),
          name: 'vip_card',
          meta: {title: '会员卡', power: 'vip_grade_card'}
        },
        {
          path: 'vip_power',
          component: () => import('@/z/vip/power/list'),
          name: 'vip_power',
          meta: {title: '会员权益设置', power: 'vip_grade_explain'}
        },
        // {
        //   path: 'vip_rule',
        //   component: () => import('@/z/vip/rule/list'),
        //   name: 'vip_rule',
        //   meta: { title: '会员规则设置' }
        // }
      ]
    },
    {
      path: 'ticket_manager',
      component: () => import('@/z/SubLayout'),
      name: 'ticket_manager',
      meta: {title: '卡券管理', power: 'vip_ticket'},
      children: [
        {
          path: 'ticket_list',
          component: () => import('@/z/vip/ticket/ticket/list'),
          name: 'ticket_list',
          meta: {title: '卡券列表', power: 'vip_ticket_list'}
        },
        // {
        //   path: 'ticket_qr_code_list',
        //   component: () => import('@/z/vip/ticket/ticket_qr_code/list'),
        //   name: 'ticket_qr_code_list',
        //   meta: { title: '卡卷二维码' }
        // },
        {
          path: 'give_ticket',
          component: () => import('@/z/vip/ticket/give_user/index'),
          name: 'give_ticket',
          meta: {title: '赠送卡券', power: 'vip_ticket_grant'}
        },
        {
          path: 'ticket_write_off',
          component: () => import('@/z/vip/ticket/check/list'),
          name: 'ticket_write_off',
          meta: {title: '卡券核销', power: 'vip_ticket_check'}
        },
        // {
        //   path: 'ticket_log',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'ticket_log',
        //   meta: { title: '卡卷记录' }
        // }
      ]
    },
    // {
    //   path: 'vip_belong_manager',
    //   component: () => import('@/z/SubLayout'),
    //   name: 'vip_belong_manager',
    //   meta: { title: '会员归属管理' },
    //   children: [
    //     {
    //       path: 'vip_channel',
    //       component: () => import('@/z/bill/transfer/transfer_list'),
    //       name: 'vip_channel',
    //       meta: { title: '多门店所属' }
    //     }
    //   ]
    // }
  ]
}
export default vipRouter
