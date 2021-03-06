import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/vip_grade/list',
    method: 'get',
    params: params
  })
}

export function getAll() {
  return request({
    url: 'api/vip/vip_grade/all',
    method: 'get'
  })
}

export function setDefaultGrade(data) {
  return request({
    url: 'api/vip/vip_grade/set_default',
    method: 'post',
    data
  })
}

export function setGradeImage(data) {
  return request({
    url: 'api/vip/vip_grade/set_grade_image',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'api/vip/vip_grade/save',
    method: 'post',
    data
  })
}

export function saveData(data) {
  return request({
    url: 'api/vip/vip_grade/save_data',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/vip/vip_grade/delete',
    method: 'post',
    data
  })
}

export function saveWeChart(data) {
  return request({
    url: 'api/vip/vip_grade/save_we_chart',
    method: 'post',
    data
  })
}

export function submitWeChart(data) {
  return request({
    url: 'api/vip/vip_grade/submit_we_chart',
    method: 'post',
    data
  })
}

export function saveAutoSendTicket(data) {
  return request({
    url: 'api/vip/vip_grade/save_auto_send_ticket',
    method: 'post',
    data
  })
}

