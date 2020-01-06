import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/shop/theme/all',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/shop/theme/save',
    method: 'post',
    data
  })
}
