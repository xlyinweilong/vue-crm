import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket/list',
    method: 'get',
    params: params
  })
}

export function getAll(params) {
  return request({
    url: 'api/vip/ticket/all',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/vip/ticket/save',
    method: 'post',
    data
  })
}

export function pushToWeChart(data) {
  return request({
    url: 'api/vip/ticket/push_to_we_chart',
    method: 'post',
    data
  })
}

export function createQrCode(data) {
  return request({
    url: 'api/vip/ticket/create_qr_code',
    method: 'post',
    data
  })
}

export function sendTicket(data) {
  return request({
    url: 'api/vip/ticket/send_ticket',
    method: 'post',
    data
  })
}

export function upShelf(data) {
  return request({
    url: 'api/vip/ticket/up_shelf',
    method: 'post',
    data
  })
}

export function setBirthday(data) {
  return request({
    url: 'api/vip/ticket/set_birthday',
    method: 'post',
    data
  })
}

export function setNeedPay(data) {
  return request({
    url: 'api/vip/ticket/set_need_pay',
    method: 'post',
    data
  })
}

export function setConsumeGive(data) {
  return request({
    url: 'api/vip/ticket/set_consume_give',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/vip/ticket/disabled',
    method: 'post',
    data
  })
}

export function info(params) {
  return request({
    url: 'api/vip/ticket/info',
    method: 'get',
    params: params
  })
}
