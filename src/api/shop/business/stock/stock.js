import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/shop/stock/list',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/shop/stock/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
