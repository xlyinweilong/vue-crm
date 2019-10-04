import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/user/list',
    method: 'get',
    params: params
  })
}

export function info(params) {
  return request({
    url: 'api/user/info',
    method: 'get',
    params: params
  })
}

export function initEmploy(data) {
  return request({
    url: 'api/user/init_employ',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/user/delete',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'api/user/save',
    method: 'post',
    data
  })
}
