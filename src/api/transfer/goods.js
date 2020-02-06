import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/erp_goods/list',
    method: 'get',
    params: params
  })
}

export function info(params) {
  return request({
    url: 'api/erp_goods/info',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/erp_goods/save',
    method: 'post',
    data
  })
}

export function allBrand() {
  return request({
    url: 'api/erp_goods/all_brand',
    method: 'get'
  })
}

export function saveBrand(data) {
  return request({
    url: 'api/erp_goods/save_brand',
    method: 'post',
    data: data
  })
}

export function allCategory() {
  return request({
    url: 'api/erp_goods/all_category',
    method: 'get'
  })
}

export function saveCategory(data) {
  return request({
    url: 'api/erp_goods/save_category',
    method: 'post',
    data: data
  })
}

export function allCategory2() {
  return request({
    url: 'api/erp_goods/all_category2',
    method: 'get'
  })
}

export function saveCategory2(data) {
  return request({
    url: 'api/erp_goods/save_category2',
    method: 'post',
    data: data
  })
}

export function allSeason() {
  return request({
    url: 'api/erp_goods/all_season',
    method: 'get'
  })
}

export function allYear() {
  return request({
    url: 'api/erp_goods/all_year',
    method: 'get'
  })
}

export function onShelf(data) {
  return request({
    url: 'api/erp_goods/on_shelf',
    method: 'post',
    data: data
  })
}
