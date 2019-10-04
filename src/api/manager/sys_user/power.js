import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/power/all',
    method: 'get'
  })
}
