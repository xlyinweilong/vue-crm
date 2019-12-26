import request from '@/utils/request'

export function getStatus(params) {
  return request({
    url: 'api/common/upload/upload_status',
    method: 'get',
    params: params
  })
}

