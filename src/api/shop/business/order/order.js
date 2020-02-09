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

export function exportExcel(data) {
  return request({
    url: 'api/shop/order/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
