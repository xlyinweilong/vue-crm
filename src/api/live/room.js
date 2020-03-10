import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/live/list',
    method: 'get',
    params: params
  })
}

export function loadByApi() {
  return request({
    url: 'api/live/load_by_api',
    method: 'post'
  })
}
