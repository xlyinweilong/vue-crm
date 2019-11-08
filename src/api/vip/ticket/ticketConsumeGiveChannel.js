import request from '@/utils/request'

export function all(params) {
  return request({
    url: 'api/vip/ticket/consume_give_channel/all',
    method: 'get',
    params: params
  })
}


