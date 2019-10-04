import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/complaint/list',
    method: 'get',
    params: params
  })
}
