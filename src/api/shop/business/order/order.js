import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/shop/order/list',
    method: 'post',
    data
  })
}

export function saveExpressCode(data) {
  return request({
    url: 'api/shop/order/save_express_code',
    method: 'post',
    data
  })
}

export function info(params) {
  return request({
    url: 'api/shop/order/info',
    method: 'get',
    params: params
  })
}

export function infoAndStock(params) {
  return request({
    url: 'api/shop/order/info_and_stock',
    method: 'get',
    params: params
  })
}

export function changeColorOrSize(data) {
  return request({
    url: 'api/shop/order/change_color_size',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/shop/order/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export function changeLocation(data) {
  return request({
    url: 'api/shop/order/change_location',
    method: 'post',
    data
  })
}

export function createRefundOrder(data) {
  return request({
    url: 'api/shop/refund_order/create_refund_order',
    method: 'post',
    data
  })
}

export function loadSendGoodsInfo(data) {
  return request({
    url: 'api/shop/order/load_send_goods_info',
    method: 'post',
    data
  })
}

export function changeSendingOrder(data) {
  return request({
    url: 'api/shop/order/change_sending_order',
    method: 'post',
    data
  })
}
