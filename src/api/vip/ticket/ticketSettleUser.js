import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket_settle_user/list',
    method: 'get',
    params: params
  })
}
