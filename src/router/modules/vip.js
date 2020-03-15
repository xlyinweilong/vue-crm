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
        },
        {
          path: 'vip_recommend_activity',
          component: () => import('@/z/vip/vip_manager/recommend/list'),
          name: 'vip_recommend_activity',
          meta: {title: '会员拉新活动码', power: 'vip_recommend_activity'}
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
        }
      ]
    },
    {
      path: 'diy_ticket',
      component: () => import('@/z/SubLayout'),
      name: 'diy_ticket',
      meta: {title: '优惠券', power: 'vip_ticket'},
      children: [
        {
          path: 'diy_ticket_list',
          component: () => import('@/z/vip/diy_ticket/ticket/index'),
          name: 'diy_ticket_list',
          meta: {title: '优惠券列表', power: 'vip_ticket_list'}
        },
        {
          path: 'diy_ticket_detail_list',
          component: () => import('@/z/vip/diy_ticket/ticket/list'),
          name: 'diy_ticket_detail_list',
          meta: {title: '优惠券明细', power: 'vip_ticket_list'}
        }
      ]
    },
    {
      path: 'ticket_manager',
      component: () => import('@/z/SubLayout'),
      name: 'ticket_manager',
      meta: {title: '微信卡券', power: 'vip_ticket'},
      children: [
        {
          path: 'ticket_list',
          component: () => import('@/z/vip/ticket/ticket/list'),
          name: 'ticket_list',
          meta: {title: '卡券列表', power: 'vip_ticket_list'}
        },
        {
          path: 'ticket_detail/:id',
          component: () => import('@/z/vip/ticket/ticket/detail'),
          name: 'ticket_list',
          hidden: true,
          meta: {title: '卡券明细', power: 'vip_ticket_list'}
        },
        {
          path: 'give_ticket',
          component: () => import('@/z/vip/ticket/give_user/index'),
          name: 'give_ticket',
          meta: {title: '赠送卡券', power: 'vip_ticket_grant'}
        },
        {
          path: 'receive_list',
          component: () => import('@/z/vip/ticket/receive/list'),
          name: 'receive_list',
          meta: {title: '领取列表', power: 'vip_ticket_receive'}
        },
        {
          path: 'ticket_write_off',
          component: () => import('@/z/vip/ticket/check/list'),
          name: 'ticket_write_off',
          meta: {title: '卡券核销', power: 'vip_ticket_check'}
        },
        {
          path: 'we_chat_pay_order',
          component: () => import('@/z/vip/ticket/pay_order/list'),
          name: 'we_chat_pay_order',
          meta: {title: '支付单据', power: 'we_chat_pay_order'}
        }
      ]
    }
  ]
}
export default vipRouter
