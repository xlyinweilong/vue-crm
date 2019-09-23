import request from '@/utils/request'

export function synchronization() {
  return request({
    url: 'api/source_material/synchronization',
    method: 'post'
  })
}

export function getList(params) {
  return request({
    url: 'api/source_material/list',
    method: 'get',
    params: params
  })
}
