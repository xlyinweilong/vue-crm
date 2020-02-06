import request from '@/utils/request'

export function saveGoodsImage(data) {
  return request({
    url: 'api/shop/goods/save_goods_image',
    method: 'post',
    data
  })
}

export function allSize() {
  return request({
    url: 'api/shop/goods/all_size',
    method: 'get'
  })
}

export function saveSize(data) {
  return request({
    url: 'api/shop/goods/save_size',
    method: 'post',
    data
  })
}

