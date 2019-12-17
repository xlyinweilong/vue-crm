import request from '@/utils/request'

export function all(params) {
  return request({
    url: 'api/power/all',
    method: 'get',
    params: params
  })
}
