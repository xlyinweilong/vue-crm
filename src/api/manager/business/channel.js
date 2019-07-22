import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/channel/list',
    method: 'get',
    params: params
  })
}
