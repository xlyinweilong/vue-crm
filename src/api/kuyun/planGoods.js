import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/kuyunshang/plan_goods/list',
    method: 'get',
    params: params
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/kuyunshang/plan_goods/delete',
    method: 'post',
    data
  })
}
