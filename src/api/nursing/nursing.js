import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/nursing/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/nursing_recharge_config/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/nursing_recharge_config/delete',
    method: 'post',
    data
  })
}
