import request from '@/utils/request'

export function employPk(data) {
  return request({
    url: 'api/report/nursing/employ_pk',
    method: 'post',
    data
  })
}
