import request from '@/utils/request'

export function deleteEle(data) {
  return request({
    url: 'api/shop/goods_list_detail/delete',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: 'api/shop/goods_list_detail/list',
    method: 'post',
    data
  })
}

