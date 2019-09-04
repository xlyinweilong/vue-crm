import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/evaluation_tag_template/list',
    method: 'get',
    params: params
  })
}

export function save(data) {
  return request({
    url: 'api/evaluation_tag_template/save',
    method: 'post',
    data: data
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/evaluation_tag_template/delete',
    method: 'post',
    data: data
  })
}
