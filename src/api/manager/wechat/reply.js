import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/we_chat_reply/save',
    method: 'post',
    data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/we_chat_reply/delete',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: 'api/we_chat_reply/list',
    method: 'get',
    params: params
  })
}
