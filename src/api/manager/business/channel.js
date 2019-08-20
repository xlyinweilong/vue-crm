import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/channel/list',
    method: 'get',
    params: params
  })
}

export function saveLocation(data) {
  return request({
    url: 'api/channel/save_location',
    method: 'post',
    data: data
  })
}

export function save(data) {
  return request({
    url: 'api/channel/save',
    method: 'post',
    data: data
  })
}
