import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/erp_integral/list',
    method: 'get',
    params: params
  })
}

export function saveConfig(data) {
  return request({
    url: 'api/erp_integral/save_config',
    method: 'post',
    data: data
  })
}

export function infoConfig(params) {
  return request({
    url: 'api/erp_integral/info_config',
    method: 'get',
    params: params
  })
}
