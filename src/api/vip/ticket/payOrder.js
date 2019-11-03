import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket/pay_order/list',
    method: 'get',
    params: params
  })
}
