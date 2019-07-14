import request from '@/utils/request'

export function geGoodsInfo(data) {
  return request({
    url: 'api/operation/goods_info',
    method: 'post',
    data
  })
}

export function nextGoods(data) {
  return request({
    url: 'api/operation/next_goods',
    method: 'post',
    data
  })
}

