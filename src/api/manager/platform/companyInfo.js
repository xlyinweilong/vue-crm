import request from '@/utils/request'

export function info() {
  return request({
    url: 'api/company_info/info',
    method: 'get',
  })
}

export function save(data) {
  return request({
    url: 'api/company_info/save',
    method: 'post',
    data: data
  })
}
