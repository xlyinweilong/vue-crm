import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/payment/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/payment/save',
    method: 'post',
    data
  })
}
