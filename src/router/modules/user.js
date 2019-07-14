import Layout from '@/views/layout/Layout'

/**
 * 用户中心
 */
const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user',
  name: 'User',
  meta: {
    title: '用户中心',
    icon: 'table',
    power: 'user_'
  },
  children: [
    {
      path: 'role',
      component: () => import('@/z/user/role/list'),
      name: 'role',
      meta: {title: '角色管理', power: 'user_role'}
    },
    {
      path: 'role_power/:id',
      component: () => import('@/z/user/role/role_power'),
      name: 'role_power',
      hidden: true,
      meta: {title: '角色权限'}
    },
    {
      path: 'user',
      component: () => import('@/z/user/user/list'),
      name: 'user',
      meta: {title: '用户管理', power: 'user_user'}
    }
  ]
}
export default userRouter
