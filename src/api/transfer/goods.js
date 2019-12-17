import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/erp_goods/list',
    method: 'get',
    params: params
  })
}

export function allBrand() {
  return request({
    url: 'api/erp_goods/all_brand',
    method: 'get'
  })
}

export function allCategory() {
  return request({
    url: 'api/erp_goods/all_category',
    method: 'get'
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

export function save(data) {
  return request({
    url: 'api/erp_goods/save',
    method: 'post',
    data: data
  })
}
