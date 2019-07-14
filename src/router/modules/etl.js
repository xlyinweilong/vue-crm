import Layout from '@/views/layout/Layout'

/**
 * etl抽取
 */
const etlRouter = {
  path: '/etl',
  component: Layout,
  redirect: '/etl/config',
  name: 'etl',
  meta: {
    title: '数据源',
    icon: 'table',
  },
  children: [
    {
      path: 'config',
      component: () => import('@/z/etl/db_config'),
      name: 'config',
      meta: {title: '数据源配置'}
    },
    {
      path: 'extract',
      component: () => import('@/z/etl/extract'),
      name: 'extract',
      meta: {title: '数据抽取'}
    }
  ]
}
export default etlRouter
