import request from '@/utils/request'

export function get(params) {
  return request({
    url: 'api/etl/info_config',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/etl/save_config',
    method: 'post',
    data
  })
}
