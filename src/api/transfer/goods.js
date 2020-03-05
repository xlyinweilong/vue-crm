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

export function saveGoods(data) {
  return request({
    url: 'api/erp_goods/save_goods',
    method: 'post',
    data
  })
}

export function saveColor(data) {
  return request({
    url: 'api/erp_goods/save_goods_color',
    method: 'post',
    data
  })
}

export function saveSize(data) {
  return request({
    url: 'api/erp_goods/save_goods_size',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/erp_goods/delete_goods',
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

export function deleteBrand(data) {
  return request({
    url: 'api/erp_goods/delete_brand',
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

export function deleteCategory(data) {
  return request({
    url: 'api/erp_goods/delete_category',
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

export function deleteCategory2(data) {
  return request({
    url: 'api/erp_goods/delete_category2',
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

export function saveSeason(data) {
  return request({
    url: 'api/erp_goods/save_season',
    method: 'post',
    data: data
  })
}

export function deleteSeason(data) {
  return request({
    url: 'api/erp_goods/delete_season',
    method: 'post',
    data: data
  })
}

export function allYear() {
  return request({
    url: 'api/erp_goods/all_year',
    method: 'get'
  })
}

export function saveYear(data) {
  return request({
    url: 'api/erp_goods/save_year',
    method: 'post',
    data: data
  })
}

export function deleteYear(data) {
  return request({
    url: 'api/erp_goods/delete_year',
    method: 'post',
    data: data
  })
}

export function onShelf(data) {
  return request({
    url: 'api/erp_goods/on_shelf',
    method: 'post',
    data: data
  })
}

export function exportExcel(data) {
  return request({
    url: 'api/erp_goods/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}


export function exportExcelAll(data) {
  return request({
    url: 'api/erp_goods/export_all',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
