import request from '@/utils/request'

export function info() {
  return request({
    url: 'api/diy_ui/info',
    method: 'get',
  })
}

export function save(data) {
  return request({
    url: 'api/diy_ui/save',
    method: 'post',
    data: data
  })
}
