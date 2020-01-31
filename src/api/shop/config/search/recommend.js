import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/shop/search/recommend/all',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/shop/search/recommend/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/shop/search/recommend/delete',
    method: 'post',
    data
  })
}
