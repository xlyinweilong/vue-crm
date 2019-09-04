import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/evaluation_employ/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/evaluation_employ/save',
    method: 'post',
    data: data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/evaluation_employ/delete',
    method: 'post',
    data: data
  })
}
