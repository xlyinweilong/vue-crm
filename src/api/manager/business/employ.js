import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/employ/save',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: 'api/employ/list',
    method: 'get',
    params: params
  })
}

export function info(params) {
  return request({
    url: 'api/employ/info',
    method: 'get',
    params: params
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/employ/delete',
    method: 'post',
    data
  })
}

export function loadQrCode() {
  return request({
    url: 'api/employ/load_qr_code',
    method: 'get'
  })
}

export function exportExcel(params) {
  return request({
    url: 'api/employ/export',
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}

export function downloadImages() {
  return request({
    url: 'api/employ/download',
    method: 'get',
    responseType: 'blob'
  })
}

