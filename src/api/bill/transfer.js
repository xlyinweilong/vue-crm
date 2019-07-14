import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/transfer/list',
    method: 'get',
    params: params
  })
}

export function deleteEle(data) {
  return request({
    url: 'api/transfer/delete_transfer',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'api/transfer/save',
    method: 'post',
    data
  })
}

export function saveLog(data) {
  return request({
    url: 'api/transfer/save_log',
    method: 'post',
    data
  })
}

export function logList(params) {
  return request({
    url: 'api/transfer/log_list',
    method: 'get',
    params: params
  })
}

export function getInfo(params) {
  return request({
    url: 'api/transfer/info',
    method: 'get',
    params: params
  })
}

export function getDiy(params) {
  return request({
    url: 'api/transfer/list_diy',
    method: 'get',
    params: params
  })
}

export function saveDiy(data) {
  return request({
    url: 'api/transfer/save_diy',
    method: 'post',
    data
  })
}

export function resultStockList(params) {
  return request({
    url: 'api/transfer_result/list',
    method: 'get',
    params: params
  })
}

export function createResult(params) {
  return request({
    url: 'api/transfer_result/create_result',
    method: 'get',
    params: params
  })
}

export function synchronization(params) {
  return request({
    url: 'api/transfer_result/synchronization',
    method: 'get',
    params: params
  })
}

export function getResultStatus(params) {
  return request({
    url: 'api/transfer_result/status_result',
    method: 'get',
    params: params
  })
}


