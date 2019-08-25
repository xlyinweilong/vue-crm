import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/vip/vip_rule/all',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/vip/vip_rule/save',
    method: 'post',
    data
  })
}
