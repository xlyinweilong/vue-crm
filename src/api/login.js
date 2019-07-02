import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/login/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/login/logout',
    method: 'post'
  })
}
