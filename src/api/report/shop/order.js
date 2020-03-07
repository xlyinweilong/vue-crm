import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/report/shop_order/list',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/report/shop_order/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export function exportDetailExcel(data) {
  return request({
    url: 'api/report/shop_order/export_detail',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
