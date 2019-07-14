import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/kuyunshang/plan/save',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: 'api/kuyunshang/plan/list',
    method: 'get',
    params: params
  })
}

export function info(params) {
  return request({
    url: 'api/kuyunshang/plan/info',
    method: 'get',
    params: params
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/kuyunshang/plan/delete',
    method: 'post',
    data
  })
}
