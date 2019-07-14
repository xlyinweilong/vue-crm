import Layout from '@/views/layout/Layout'

/**
 * 偏好设置
 */
const diyRouter = {
  path: '/diy',
  component: Layout,
  redirect: '/diy/bill_list',
  name: 'Diy',
  meta: {
    title: '偏好设置',
    icon: 'table',
  },
  children: [
    {
      path: 'bill_list',
      component: () => import('@/z/diy/bill/list'),
      name: 'bill_list',
      meta: {title: '单据偏好'}
    },
    {
      path: 'cash_list',
      component: () => import('@/z/diy/cash/list'),
      name: 'cash_list',
      meta: {title: 'POS偏好'}
    }
  ]
}
export default diyRouter
