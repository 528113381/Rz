import request from '@/utils/request'

// 获取组织列表的请求
export function getUserListRequest(params) {
  return request({
    url: '/sys/user',
    params
  })
}
