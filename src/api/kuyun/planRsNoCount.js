import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/kuyunshang/plan_rs/no_count_list',
    method: 'get',
    params: params
  })
}
