import request from '@/utils/request'

export function init() {
  return request({
    url: 'api/system_init/init',
    method: 'get'
  })
}

export function save() {
  return request({
    url: 'api/system_init/save',
    method: 'post'
  })
}
