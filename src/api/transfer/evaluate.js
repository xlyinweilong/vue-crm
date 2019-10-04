import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/evaluation/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/evaluation/save',
    method: 'post',
    data: data
  })
}

export function changeStatus(data) {
  return request({
    url: 'api/evaluation/change_status',
    method: 'post',
    data: data
  })
}
