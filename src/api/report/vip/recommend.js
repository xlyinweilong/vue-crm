import request from '@/utils/request'

export function recommendList(data) {
  return request({
    url: 'api/report/recommend/list',
    method: 'post',
    data
  })
}
