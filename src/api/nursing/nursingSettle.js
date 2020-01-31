import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/nursing_settle/list',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: 'api/nursing_settle/create',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/nursing_settle/delete',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/nursing_settle/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
