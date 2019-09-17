import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket_detail/list',
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

