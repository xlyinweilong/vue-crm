import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/erp_integral/list',
    method: 'get',
    params: params
  })
}
