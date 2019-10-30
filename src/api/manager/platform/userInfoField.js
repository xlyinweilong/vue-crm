import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/diy_user_info_field/list',
    method: 'get',
    params: params
  })
}

export function all() {
  return request({
    url: 'api/diy_user_info_field/all',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/diy_user_info_field/save',
    method: 'post',
    data: data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/diy_user_info_field/delete',
    method: 'post',
    data: data
  })
}
