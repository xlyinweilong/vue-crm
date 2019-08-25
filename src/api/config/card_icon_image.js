import request from '@/utils/request'

export function all() {
  return request({
    url: 'api/config/card_icon_image/all',
    method: 'get'
  })
}
