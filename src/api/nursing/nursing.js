import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/nursing/list',
    method: 'post',
    data
  })
}

export function info(params) {
  return request({
    url: 'api/nursing/info',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/nursing/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/nursing/delete',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/nursing/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
