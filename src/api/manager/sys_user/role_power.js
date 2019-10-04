import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/role_power/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/role_power/save',
    method: 'post',
    data
  })
}
