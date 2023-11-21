import request from '@/utils/request'

// 获取组织列表的请求
export function departmentRequest() {
  return request({
    url: '/company/department'
  })
}

// 获取部门负责人列表
export function simpleListRequest() {
  return request({
    url: '/sys/user/simple'
  })
}
