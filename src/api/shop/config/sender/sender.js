import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/shop/express_sender/list',
    method: 'get',
    params: params
  })
}

export function getAll() {
  return request({
    url: 'api/shop/express_sender/all',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: 'api/shop/express_sender/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/shop/express_sender/delete',
    method: 'post',
    data
  })
}
