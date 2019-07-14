import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/kuyunshang/plan_rs/list',
    method: 'get',
    params: params
  })
}

export function progress(params) {
  return request({
    url: 'api/kuyunshang/plan_rs/progress',
    method: 'get',
    params: params
  })
}

export function createRs(data) {
  return request({
    url: 'api/kuyunshang/plan_rs/create',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/kuyunshang/plan_rs/delete',
    method: 'post',
    data
  })
}
