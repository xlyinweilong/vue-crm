import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket/pay_order/list',
    method: 'get',
    params: params
  })
}

export function postList(data) {
  return request({
    url: 'api/vip/ticket/pay_order/list',
    method: 'post',
    data
  })
}

export function totalAll(data) {
  return request({
    url: 'api/vip/ticket/pay_order/total',
    method: 'post',
    data
  })
}

export function refund(data) {
  return request({
    url: 'api/vip/ticket/pay_order/refund',
    method: 'post',
    data
  })
}

export function refundList(params) {
  return request({
    url: 'api/vip/ticket/pay_order/refund_list',
    method: 'get',
    params: params
  })
}

/**
 * 卡卷的主动失效
 */
export function invalid(data) {
  return request({
    url: 'api/vip/ticket/pay_order/invalid',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/vip/ticket/pay_order/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
