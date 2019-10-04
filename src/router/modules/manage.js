import Layout from '@/views/layout/Layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: '/manage/delivery',
  name: 'manage',
  meta: {
    title: '管理',
    icon: 'table',
    power: 'manage'
  },
  children: [
    {
      path: 'platform_settings',
      component: () => import('@/z/SubLayout'),
      name: 'platform_settings',
      meta: {title: '平台设置', power: 'manage_platform'},
      children: [
        {
          path: 'company_info',
          component: () => import('@/z/manage/platform_settings/company_info'),
          name: 'company_info',
          meta: {title: '公司信息', power: 'manage_platform_company'}
        },
        {
          path: 'interface_settings',
          component: () => import('@/z/manage/platform_settings/ui/index'),
          name: 'interface_settings',
          meta: {title: '界面设置', power: 'manage_platform_ui'}
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
      meta: {title: '商家管理', power: 'manage_business'},
      children: [
        {
          path: 'wechart_user_list',
          component: () => import('@/z/manage/business/wechart_user/list'),
          name: 'wechart_user_list',
          meta: {title: '用户管理', power: 'manage_business_user'}
        },
        {
          path: 'shop_manage',
          component: () => import('@/z/manage/business/channel/channel_list'),
          name: 'shop_manage',
          meta: {title: '门店管理', power: 'manage_business_channel'}
        },
        {
          path: 'user_manage',
          component: () => import('@/z/manage/business/user/user_list'),
          name: 'user_manage',
          meta: {title: '员工管理', power: 'manage_business_employ'}
        }
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
      meta: {title: '微信公众平台', power: 'manage_wechat'},
      children: [
        {
          path: 'parameter_settings',
          component: () => import('@/z/manage/business/weChatPublicPlatform/parameter_settings'),
          name: 'parameter_settings',
          meta: {title: '参数设置', power: 'manage_wechat_parameter'}
        },
        {
          path: 'diy_view',
          component: () => import('@/z/manage/platform_settings/diy_view/list'),
          name: 'diy_view',
          meta: {title: '公众号菜单', power: 'manage_wechat_menu'}
        },
        {
          path: 'source_material',
          component: () => import('@/z/manage/business/weChatPublicPlatform/source_material'),
          name: 'source_material',
          meta: {title: '素材管理', power: 'manage_wechat_material'}
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
    {
      path: 'system_manage',
      component: () => import('@/z/SubLayout'),
      name: 'system_manage',
      meta: {title: '系统设置', power: 'manage_sys'},
      children: [
        {
          path: 'system_init',
          component: () => import('@/z/manage/system/system_init'),
          name: 'system_init',
          meta: {title: '初始化系统', power: 'manage_sys_init'}
        },
        {
          path: 'role_list',
          component: () => import('@/z/manage/sys_user/role/list'),
          name: 'role_list',
          meta: {title: '角色管理', power: 'manage_sys_role'}
        },
        {
          path: 'user_list',
          component: () => import('@/z/manage/sys_user/user/list'),
          name: 'user_list',
          meta: {title: '账号管理', power: 'manage_sys_user'}
        }
      ]
    }
  ]
}
export default manageRouter
