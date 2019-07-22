import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/wechat_config/save',
    method: 'post',
    data
  })
}

export function get() {
  return request({
    url: 'api/wechat_config/info',
    method: 'get'
  })
}
