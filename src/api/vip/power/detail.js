import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/vip/vip_power_detail/list',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/vip/vip_power_detail/save',
    method: 'post',
    data
  })
}

export function saveInfo(data) {
  return request({
    url: 'api/vip/vip_power_detail/save_info',
    method: 'post',
    data
  })
}
