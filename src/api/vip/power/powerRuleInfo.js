import request from '@/utils/request'

export function info(params) {
  return request({
    url: 'api/vip/vip_power_rule_info/info',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/vip/vip_power_rule_info/save',
    method: 'post',
    data
  })
}
