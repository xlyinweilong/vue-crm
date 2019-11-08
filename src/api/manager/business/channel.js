import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/channel/list',
    method: 'get',
    params: params
  })
}

export function getAll() {
  return request({
    url: 'api/channel/all',
    method: 'get'
  })
}

export function saveLocation(data) {
  return request({
    url: 'api/channel/save_location',
    method: 'post',
    data: data
  })
}

export function save(data) {
  return request({
    url: 'api/channel/save',
    method: 'post',
    data: data
  })
}

export function loadQrCode(params) {
  return request({
    url: 'api/channel/load_qr_code',
    method: 'get',
    params: params
  })
}


export function loadComplaintQrCode(params) {
  return request({
    url: 'api/channel/load_complaint_qr_code',
    method: 'get',
    params: params
  })
}
