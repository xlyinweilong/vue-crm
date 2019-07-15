import Layout from '@/views/layout/Layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  redirect: '/report/delivery',
  name: 'report',
  meta: {
    title: '报表',
    icon: 'table'
  },
  children: [
    {
      path: 'vip',
      component: () => import('@/z/SubLayout'),
      name: 'vip',
      meta: { title: '会员' },
      children: [
        {
          path: 'vip_active_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_active_report',
          meta: { title: '会员活跃度报表' }
        },
        {
          path: 'vip_promotion_award_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_promotion_award_report',
          meta: { title: '会员推广奖励报表' }
        },
        {
          path: 'vip_open_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_open_report',
          meta: { title: '会员开卡分析报表' }
        },
        {
          path: 'vip_save_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'vip_save_report',
          meta: { title: '会员维护情况报表' }
        }
      ]
    },
    {
      path: 'fan_data',
      component: () => import('@/z/SubLayout'),
      name: 'fan_data',
      meta: { title: '粉丝数据' },
      children: [
        {
          path: 'fan_active_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'fan_active_report',
          meta: { title: '分析活跃报表' }
        }
      ]
    },
    {
      path: 'evaluate_report',
      component: () => import('@/z/SubLayout'),
      name: 'evaluate_report',
      meta: { title: '评价报表' },
      children: [
        {
          path: 'evaluate_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'evaluate_report',
          meta: { title: '评价报表' }
        }
      ]
    },
    {
      path: 'performance_member_contrast',
      component: () => import('@/z/SubLayout'),
      name: 'performance_member_contrast',
      meta: { title: '业绩-会员对比' },
      children: [
        {
          path: 'org_order_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'org_order_report',
          meta: { title: '机构订单表' }
        },
        {
          path: 'channel_order_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'channel_order_report',
          meta: { title: '门店订单表' }
        },
        {
          path: 'employ_order_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'employ_order_report',
          meta: { title: '店员订单表' }
        },
        {
          path: 'org_vip_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'org_vip_report',
          meta: { title: '机构会员表' }
        },
        {
          path: 'channel_vip_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'channel_vip_report',
          meta: { title: '门店会员表' }
        },
        {
          path: 'employ_vip_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'employ_vip_report',
          meta: { title: '店员会员表' }
        },
        {
          path: 'org_rebuy_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'org_rebuy_report',
          meta: { title: '机构复购率表' }
        },
        {
          path: 'channel_rebuy_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'channel_rebuy_report',
          meta: { title: '门店复购率表' }
        },
        {
          path: 'employ_rebuy_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'employ_rebuy_report',
          meta: { title: '店员复购率表' }
        }
      ]
    },
    {
      path: 'customer_report',
      component: () => import('@/z/bill/index'),
      name: 'customer_report',
      hidden: true,
      meta: { title: '客服报表' },
      children: [
        {
          path: 'customer_group_sending_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'customer_group_sending_report',
          meta: { title: '客服群发报表' }
        },
        {
          path: 'customer_session_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'customer_session_report',
          meta: { title: '客服回话报表' }
        },
        {
          path: 'info_perfect_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'info_perfect_report',
          meta: { title: '资料完善报表' }
        }
      ]
    },
    {
      path: 'vip_return_visit_report',
      component: () => import('@/z/bill/index'),
      name: 'vip_return_visit_report',
      hidden: true,
      meta: { title: '会员回访统计' },
      children: [
        {
          path: 'org_consume_return_visit_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'org_consume_return_visit_report',
          meta: { title: '机构消费回访表' }
        },
        {
          path: 'channel_consume_return_visit_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'channel_consume_return_visit_report',
          meta: { title: '门店消费回访表' }
        },
        {
          path: 'employ_consume_return_visit_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'employ_consume_return_visit_report',
          meta: { title: '店员消费回访表' }
        },
        {
          path: 'org_sleep_vip_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'org_sleep_vip_report',
          meta: { title: '机构休眠会员表' }
        },
        {
          path: 'channel_sleep_vip_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'channel_sleep_vip_report',
          meta: { title: '门店休眠会员表' }
        },
        {
          path: 'employ_sleep_vip_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'employ_sleep_vip_report',
          meta: { title: '店员休眠会员表' }
        },
        {
          path: 'org_vip_birth_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'org_vip_birth_report',
          meta: { title: '机构生日会员表' }
        },
        {
          path: 'channel_vip_birth_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'channel_vip_birth_report',
          meta: { title: '门店生日会员表' }
        },
        {
          path: 'employ_vip_birth_report',
          component: () => import('@/z/bill/transfer/transfer_list'),
          name: 'employ_vip_birth_report',
          meta: { title: '店员生日会员表' }
        }
      ]
    }
  ]
}
export default reportRouter
