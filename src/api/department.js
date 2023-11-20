import request from '@/utils/request'

// 获取组织列表的请求
export function departmentRequest() {
  return request({
    url: '/company/department'
  })
}

