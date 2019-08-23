import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/vip/vip_power_template/list',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/vip/vip_power_template/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/vip/vip_power_template/delete',
    method: 'post',
    data
  })
}
