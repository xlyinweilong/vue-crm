import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/vip_grade/list',
    method: 'get',
    params: params
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

