import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'api/nursing_balance_log/list',
    method: 'post',
    data
  })
}
