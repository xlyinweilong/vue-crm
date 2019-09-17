import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/we_chat_diy_view/list',
    method: 'get',
  })
}

export function save(data) {
  return request({
    url: 'api/we_chat_diy_view/save',
    method: 'post',
    data: data
  })
}

export function createView() {
  return request({
    url: 'api/we_chat_diy_view/create_view',
    method: 'post'
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/we_chat_diy_view/delete',
    method: 'post',
    data: data
  })
}

