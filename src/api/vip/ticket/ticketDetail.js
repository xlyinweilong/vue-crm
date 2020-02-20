import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket_detail/list',
    method: 'get',
    params: params
  })
}

export function totalAll(params) {
  return request({
    url: 'api/vip/ticket_detail/total',
    method: 'get',
    params: params
  })
}

export function all(params) {
  return request({
    url: 'api/vip/ticket_detail/all',
    method: 'get',
    params: params
  })
}

export function exportExcel(params) {
  return request({
    url: 'api/vip/ticket_detail/export',
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}

export function save(data) {
  return request({
    url: 'api/vip/ticket_detail/save',
    method: 'post',
    data
  })
}

