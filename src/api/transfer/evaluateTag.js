import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/evaluation_tag/list',
    method: 'get',
    params: params
  })
}
