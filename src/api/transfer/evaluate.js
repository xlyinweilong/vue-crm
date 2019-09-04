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

export function deleteEle(data) {
  return request({
    url: 'api/evaluation/delete',
    method: 'post',
    data: data
  })
}
