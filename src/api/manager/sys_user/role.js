import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/role/list',
    method: 'get',
    params: params
  })
}
export function info(params) {
  return request({
    url: 'api/role/info',
    method: 'get',
    params: params
  })
}
export function all() {
  return request({
    url: 'api/role/all',
    method: 'get'
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/role/delete',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'api/role/save',
    method: 'post',
    data
  })
}
