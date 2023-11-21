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

// 新增部门
export function addDepartmentRequest(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 获取单个部门的详情
export function getDepartmentDetailRequest(id) {
  return request({
    url: `/company/department/${id}`
  })
}
