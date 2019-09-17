import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/wechat_user/list',
    method: 'get',
    params: params
  })
}

export function bindEmploy(data) {
  return request({
    url: 'api/wechat_user/bind_employ',
    method: 'post',
    data
  })
}

export function exportExcel(params) {
  return request({
    url: 'api/wechat_user/export',
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}
