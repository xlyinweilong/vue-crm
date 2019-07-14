import request from '@/utils/request'

export function startEtl(data) {
  return request({
    url: 'api/etl/start_etl',
    method: 'post',
    data
  })
}

export function lastExtract(params) {
  return request({
    url: 'api/etl/last_extract',
    method: 'get',
    params: params
  })
}

export function getStatus(params) {
  return request({
    url: 'api/etl/status',
    method: 'get',
    params: params
  })
}

