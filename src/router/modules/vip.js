import Layout from '@/views/layout/Layout'

/**
 * 会员
 */
const vipRouter = {
  path: '/vip',
  component: Layout,
  redirect: '/vip/grade/list',
  name: 'vip',
  meta: {
    title: '会员中心',
    icon: 'table',
    power: 'user_'
  },
  children: [
    {
      path: 'grade/list',
      component: () => import('@/z/vip/grade/list'),
      name: 'grade_list',
      meta: {title: '会员等级'}
    },
    {
      path: 'grade/set_grade',
      component: () => import('@/z/vip/grade/set_grade'),
      name: 'set_grade',
      hidden: true,
      meta: {title: '设置级别'}
    },
    {
      path: 'grade/set_up_grade',
      component: () => import('@/z/vip/grade/set_up_grade'),
      name: 'set_up_grade',
      hidden: true,
      meta: {title: '升级规则'}
    },
    {
      path: 'info/list',
      component: () => import('@/z/vip/info/list'),
      name: 'info_list',
      meta: {title: '会员信息'}
    },
    {
      path: 'coupon',
      component: () => import('@/z/vip/coupon/coupon'),
      name: 'coupon',
      meta: {title: '代用卷'}
    },
    {
      path: 'integral',
      component: () => import('@/z/vip/integral/index'),
      name: 'integral',
      meta: {title: '会员积分'},
      redirect: '/vip/integral/integral_add',
      children: [
        {
          path: 'integral_log',
          component: () => import('@/z/vip/integral/integral_log'),
          name: 'integral_log',
          meta: {title: '会员积分日志'}
        },
        {
          path: 'integral_add',
          component: () => import('@/z/vip/integral/integral_add'),
          name: 'integral_add',
          meta: {title: '积分增加规则'}
        },
        {
          path: 'integral_add_goods/:id',
          component: () => import('@/z/vip/integral/integral_add_goods'),
          name: 'integral_add_goods',
          hidden: true,
          meta: {title: '积分增加规则-货品'}
        },
        {
          path: 'integral_to_amount',
          component: () => import('@/z/vip/integral/integral_to_amount'),
          name: 'integral_plus',
          meta: {title: '积分换算金额规则'}
        }
      ]
    },
    {
      path: 'balance',
      component: () => import('@/z/vip/integral/index'),
      name: 'balance',
      meta: {title: '会员余额'},
      redirect: '/vip/integral/integral_add',
      children: [
        {
          path: 'balance_log',
          component: () => import('@/z/vip/balance/balance_log'),
          name: 'balance_log',
          meta: {title: '会员余额日志'}
        },
        {
          path: 'balance_add',
          component: () => import('@/z/vip/balance/balance_add'),
          name: 'balance_add',
          meta: {title: '余额充值'}
        }
      ]
    },
    {
      path: 'xp',
      component: () => import('@/z/vip/xp/index'),
      name: 'xp',
      meta: {title: '会员经验'},
      redirect: '/vip/xp/xp_add',
      children: [
        {
          path: 'xp_log',
          component: () => import('@/z/vip/xp/xp_log'),
          name: 'xp_log',
          meta: {title: '会员经验日志'}
        },
        {
          path: 'xp_add',
          component: () => import('@/z/vip/xp/xp_add'),
          name: 'xp_add',
          meta: {title: '经验增加规则'}
        },
        {
          path: 'xp_add_goods/:id',
          component: () => import('@/z/vip/xp/xp_add_goods'),
          name: 'xp_add_goods',
          hidden: true,
          meta: {title: '积分增加规则-货品'}
        }
        // {
        //   path: 'xp_plus',
        //   component: () => import('@/z/vip/integral/integral_plus'),
        //   name: 'xp_plus',
        //   meta: {title: '经验减少规则'}
        // }
      ]
    }
  ]
}
export default vipRouter
