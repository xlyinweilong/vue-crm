import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/we_chat_recommend/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/we_chat_recommend/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/we_chat_recommend/delete',
    method: 'post',
    data
  })
}

export function loadQrCode(data) {
  return request({
    url: 'api/we_chat_recommend/load_qr_code',
    method: 'post',
    data
  })
}
