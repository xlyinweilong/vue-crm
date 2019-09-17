import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket/send_log/list',
    method: 'get',
    params: params
  })
}

