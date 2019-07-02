import request from '@/utils/request'

export function getLogList(params) {
  return request({
    url: '/weather/weather/log_list',
    method: 'get',
    params
  })
}

export function getLogErrorList(params) {
  return request({
    url: '/weather/weather/log_error_list',
    method: 'get',
    params
  })
}

