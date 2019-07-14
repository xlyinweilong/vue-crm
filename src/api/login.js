import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'api/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'api/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'api/user/info',
    method: 'get',
    params: {token}
  })
}

export function keepAlive(params) {
  return request({
    url: 'api/user/keep_alive',
    method: 'get',
    params: params
  })
}

export function resetPassowrd(data) {
  return request({
    url: 'api/user/reset_password',
    method: 'post',
    data
  })
}

