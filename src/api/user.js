import request from '@/utils/request'

export function loginRequest(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function profileRequest() {
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}

// 修改密码
export function updatePassRequest(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}

