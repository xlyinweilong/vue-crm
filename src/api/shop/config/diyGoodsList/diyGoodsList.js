import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/shop/goods_list/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/shop/goods_list/delete',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: 'api/shop/goods_list/list',
    method: 'post',
    data
  })
}

