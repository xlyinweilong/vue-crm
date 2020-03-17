import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/shop/refund_order/list',
    method: 'get',
    params: params
  })
}

export function checkPackage(data) {
  return request({
    url: 'api/shop/refund_order/check_package',
    method: 'post',
    data
  })
}

export function loadPackInfo(params) {
  return request({
    url: 'api/shop/refund_order/load_pack_info',
    method: 'get',
    params: params
  })
}

export function checkRefundOrder(data) {
  return request({
    url: 'api/shop/refund_order/check_refund_order',
    method: 'post',
    data
  })
}

export function changeRefundSenderLocation(data) {
  return request({
    url: 'api/shop/refund_order/change_refund_sender_location',
    method: 'post',
    data
  })
}
