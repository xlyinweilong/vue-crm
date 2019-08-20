import request from '@/utils/request'

export function getBaseUrl() {
  return request({
    url: 'api/upload/base_url',
    method: 'get'
  })
}

