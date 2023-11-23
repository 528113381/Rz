import request from '@/utils/request'

// 获取角色列表的请求
export function getRoleListRequest(params) {
  return request({
    url: '/sys/role',
    params
  })
}
