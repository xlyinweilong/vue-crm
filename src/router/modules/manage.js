import Layout from '@/views/layout/Layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: '/manage/delivery',
  name: 'manage',
  meta: {
    title: '管理',
    icon: 'table',
  },
  children: [
    {
      path: 'platform_settings',
      component: () => import('@/z/SubLayout'),
      name: 'platform_settings',
      meta: {title: '平台设置'},
      children: [
        {
          path: 'interface_settings',
          component: () => import('@/z/manage/platform_settings/interface_settings'),
          name: 'interface_settings',
          meta: {title: '界面设置'}
        },
        // {
        //   path: 'reminder_settings',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'reminder_settings',
        //   meta: {title: '提醒设置'}
        // }
      ]
    },
    // {
    //   path: 'account_manage',
    //   component: () => import('@/z/SubLayout'),
    //   name: 'account_manage',
    //   meta: {title: '账户管理'},
    //   children: [
    //     {
    //       path: 'account_info',
    //       component: () => import('@/z/bill/transfer/transfer_list'),
    //       name: 'account_info',
    //       meta: {title: '账户信息'}
    //     },
    //     {
    //       path: 'mobile_short_message',
    //       component: () => import('@/z/bill/transfer/transfer_list'),
    //       name: 'mobile_short_message',
    //       meta: {title: '手机短信'}
    //     }
    //   ]
    // },
    {
      path: 'business_manage',
      component: () => import('@/z/SubLayout'),
      name: 'business_manage',
      meta: {title: '商家管理'},
      children: [
        // {
        //   path: 'organization',
        //   component: () => import('@/z/manage/business/user/user_list'),
        //   name: 'organization',
        //   meta: {title: '组织机构'}
        // },
        {
          path: 'shop_manage',
          component: () => import('@/z/manage/business/channel/channel_list'),
          name: 'shop_manage',
          meta: {title: '门店管理'}
        },
        {
          path: 'user_manage',
          component: () => import('@/z/manage/business/user/user_list'),
          name: 'user_manage',
          meta: {title: '员工管理'}
        },
        // {
        //   path: 'role_manage',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'role_manage',
        //   meta: {title: '角色管理'}
        // }
      ]
    },
    {
      path: 'wechat_public_platform',
      component: () => import('@/z/SubLayout'),
      name: 'wechat_public_platform',
      meta: {title: '微信公众平台'},
      children: [
        {
          path: 'parameter_settings',
          component: () => import('@/z/manage/business/weChatPublicPlatform/parameter_settings'),
          name: 'parameter_settings',
          meta: {title: '参数设置'}
        },
        // {
        //   path: 'reply_settings',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'reply_settings',
        //   meta: {title: '回复设置'}
        // },
        // {
        //   path: 'message_template',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'message_template',
        //   meta: {title: '自定义菜单'}
        // },
        // {
        //   path: 'role_manage',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'role_manage',
        //   meta: {title: '消息模板配置'}
        // },
        // {
        //   path: 'material',
        //   component: () => import('@/z/bill/transfer/transfer_list'),
        //   name: 'material',
        //   meta: {title: '素材分类'}
        // }
      ]
    },
    // {
    //   path: 'replenishment',
    //   component: () => import('@/z/bill/index'),
    //   name: 'replenishment',
    //   hidden: true,
    //   meta: {title: '粉丝管理'}
    // }
  ]
}
export default manageRouter
