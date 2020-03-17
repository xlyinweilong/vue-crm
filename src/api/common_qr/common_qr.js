import request from '@/utils/request'

export function loadQrCode(data) {
  return request({
    url: 'api/we_chat_common_qr/load_qr_code',
    method: 'post',
    data
  })
}

