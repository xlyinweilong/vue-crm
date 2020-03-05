import Layout from '@/views/layout/Layout'

const transactionRouter = {
  path: '/transaction',
  component: Layout,
  redirect: '/transaction/delivery',
  name: 'transaction',
  meta: {
    title: '交易',
    icon: 'table',
    power: 'transaction'
  },
  children: [
    {
      path: 'all_transaction',
      component: () => import('@/z/SubLayout'),
      name: 'all_transaction',
      meta: {title: '全部交易', power: 'transaction_all'},
      children: [
        {
          path: 'sale_bill_manager',
          component: () => import('@/z/transfer/sale_bill_list'),
          name: 'sale_bill_manager',
          meta: {title: '销售管理', power: 'transaction_all_sale'}
        },
        {
          path: 'integral_manager',
          component: () => import('@/z/transfer/integral/index'),
          name: 'integral_manager',
          meta: {title: '积分管理', power: 'transaction_all_integral'}
        },
        {
          path: 'evaluate_manager',
          component: () => import('@/z/transfer/evaluate/index'),
          name: 'evaluate_manager',
          meta: {title: '评价管理', power: 'transaction_all_evaluate'}
        },
        {
          path: 'complaint_manager',
          component: () => import('@/z/transfer/complaint/index'),
          name: 'complaint_manager',
          meta: {title: '投诉建议', power: 'transaction_all_complaint'}
        }
      ]
    },
    {
      path: 'upload_data',
      component: () => import('@/z/SubLayout'),
      name: 'upload_data',
      meta: {title: '上传数据', power: 'transaction_data'},
      children: [
        {
          path: 'channel',
          component: () => import('@/z/transfer/upload_data/channel/index'),
          name: 'channel',
          meta: {title: '店铺', power: 'transaction_data_channel'}
        },
        {
          path: 'goods',
          component: () => import('@/z/transfer/upload_data/goods/index'),
          name: 'goods',
          meta: {title: '商品', power: 'transaction_data_goods'}
        },
        {
          path: 'brand',
          component: () => import('@/z/transfer/upload_data/field/index'),
          name: 'brand',
          meta: {title: '品牌', power: 'transaction_data_brand'}
        },
        {
          path: 'category',
          component: () => import('@/z/transfer/upload_data/field/index'),
          name: 'category',
          meta: {title: '分类', power: 'transaction_data_category'}
        },
        {
          path: 'category2',
          component: () => import('@/z/transfer/upload_data/field/index'),
          name: 'category2',
          meta: {title: '二级分类', power: 'transaction_data_category2'}
        },
        {
          path: 'season',
          component: () => import('@/z/transfer/upload_data/field/index'),
          name: 'season',
          meta: {title: '季节', power: 'transaction_data_season'}
        },
        {
          path: 'year',
          component: () => import('@/z/transfer/upload_data/field/index'),
          name: 'year',
          meta: {title: '年份', power: 'transaction_data_year'}
        },
        {
          path: 'vip_grade',
          component: () => import('@/z/transfer/upload_data/vip_grade/index'),
          name: 'vip_grade',
          meta: {title: '会员等级', power: 'transaction_data_vip_grade'}
        },
        {
          path: 'employ',
          component: () => import('@/z/transfer/upload_data/employ/index'),
          name: 'employ',
          meta: {title: '员工', power: 'transaction_data_employ'}
        }
      ]
    }
  ]
}
export default transactionRouter
