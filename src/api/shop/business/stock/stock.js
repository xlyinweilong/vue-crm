import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/shop/stock/list',
    method: 'get',
    params: params
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
