import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Index',
    hidden: true,
    children: [{
      path: 'index',
      meta: { title: '首页' },
      component: () => import('@/views/index/index')
    }]
  },
  {
    path: '/dict',
    component: Layout,
    redirect: '/dict/base/goods',
    name: 'dict',
    meta: { title: '资料中心', icon: 'example' },
    children: [
      {
        path: 'base',
        name: 'base',
        redirect: '/dict/base/goods',
        meta: { title: '基本资料' },
        children: [
          {
            path: 'goods',
            component: () => import('@/business/dict/base/goods/goods'),
            name: 'goods',
            meta: { title: '货品部分' }
          },
          {
            path: 'channel',
            component: () => import('@/business/dict/base/goods/goods'),
            name: 'channel',
            meta: { title: '渠道部分' }
          },
          {
            path: 'vip',
            component: () => import('@/business/dict/base/goods/goods'),
            name: 'vip',
            meta: { title: '会员部分' }
          }
        ]
      },
      // {
      //   path: 'taskLogList',
      //   name: 'TaskLogList',
      //   component: () => import('@/views/task/task_log_list'),
      //   meta: { title: '供应商资料' }
      // },
      // {
      //   path: 'taskLogDetailList/:id(\\d+)',
      //   name: 'TaskLogDetailList',
      //   hidden: true,
      //   component: () => import('@/views/task/task_log_detail_list'),
      //   meta: { title: '任务日志详情', noCache: true }
      // }
    ]
  },
  // {
  //   path: '/weather',
  //   component: Layout,
  //   redirect: '/weather/logList',
  //   name: 'Weather',
  //   meta: { title: '天气', icon: 'link' },
  //   children: [
  //     {
  //       path: 'logList',
  //       name: 'LogList',
  //       component: () => import('@/views/weather/log_list'),
  //       meta: { title: '天气日志列表', icon: 'table' }
  //     },
  //     {
  //       path: 'logErrorList/:id(\\d+)',
  //       name: 'LogErrorList',
  //       hidden: true,
  //       component: () => import('@/views/weather/log_error_list'),
  //       meta: { title: '天气日志错误详情', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    hidden: true,
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    hidden: true,
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
