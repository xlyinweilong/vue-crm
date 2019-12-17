import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/nursing_category_config/list',
    method: 'get',
    params: params
  })
}

export function all() {
  return request({
    url: 'api/nursing_category_config/all',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/nursing_category_config/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/nursing_category_config/delete',
    method: 'post',
    data
  })
}
