import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/vip/ticket_goods/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/vip/ticket_goods/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/vip/ticket_goods/delete',
    method: 'post',
    data
  })
}
