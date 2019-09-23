import request from '@/utils/request'

export function info(params) {
  return request({
    url: 'api/config/sysconfig/info',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/config/sysconfig/save',
    method: 'post',
    data: data
  })
}

