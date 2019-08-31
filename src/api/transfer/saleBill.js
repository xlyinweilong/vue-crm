import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/erp_sale_bill/list',
    method: 'get',
    params: params
  })
}
