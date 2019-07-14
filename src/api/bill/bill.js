import request from '@/utils/request'

export function getChannelList(params) {
  return request({
    url: 'api/dim/channel_list',
    method: 'get',
    params: params
  })
}

export function getWarehouseList(params) {
  return request({
    url: 'api/dim/warehouse_list',
    method: 'get',
    params: params
  })
}

export function getSupplierList(params) {
  return request({
    url: 'api/dim/supplier_list',
    method: 'get',
    params: params
  })
}

export function dimGoodsList(params) {
  return request({
    url: 'api/dim/dim_goods_list',
    method: 'get',
    params: params
  })
}

export function searchGoodsList(data) {
  return request({
    url: 'api/dim/search_goods_list',
    method: 'post',
    data
  })
}

