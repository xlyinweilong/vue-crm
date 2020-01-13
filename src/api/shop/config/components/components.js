import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/shop/index_components/all',
    method: 'get'
  })
}

export function info(params) {
  return request({
    url: 'api/shop/theme_components/info',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/shop/theme_components/save',
    method: 'post',
    data
  })
}
