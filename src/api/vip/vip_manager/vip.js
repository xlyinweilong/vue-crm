import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/vip/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/vip/vip/save',
    method: 'post',
    data
  })
}
