import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/shop/index_components/all',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: 'api/shop/index_components/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/shop/index_components/save',
    method: 'post',
    data
  })
}
