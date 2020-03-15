import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/shop/pack/list',
    method: 'post',
    data
  })
}

export function cancelOrder(data) {
  return request({
    url: 'api/shop/pack/cancel_order',
    method: 'post',
    data
  })
}

export function pack(data) {
  return request({
    url: 'api/shop/pack/pack',
    method: 'post',
    data
  })
}

export function packRefund(data) {
  return request({
    url: 'api/shop/pack/pack_refund',
    method: 'post',
    data
  })
}

export function loadPackInfo() {
  return request({
    url: 'api/shop/pack/load_pack_info',
    method: 'get'
  })
}

export function getAllAccount() {
  return request({
    url: 'api/shop/pack/get_all_account',
    method: 'post'
  })
}

export function getAccountList() {
  return request({
    url: 'api/shop/pack/get_account_list',
    method: 'get'
  })
}

export function setPrinter(data) {
  return request({
    url: 'api/shop/pack/set_printer',
    method: 'post',
    data
  })
}

export function getAllDelivery() {
  return request({
    url: 'api/shop/pack/get_all_delivery',
    method: 'get'
  })
}

