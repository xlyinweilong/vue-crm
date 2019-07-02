import request from '@/utils/request'

export function getTaskList(params) {
  return request({
    url: '/weather/task/task_list',
    method: 'get',
    params
  })
}

export function getTaskLogList(params) {
  return request({
    url: '/weather/task/task_log_list',
    method: 'get',
    params
  })
}

export function getTaskLogDetailList(params) {
  return request({
    url: '/weather/task/task_log_detail_list',
    method: 'get',
    params
  })
}
