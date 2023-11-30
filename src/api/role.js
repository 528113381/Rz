import request from '@/utils/request'

// 获取角色列表的请求
export function getRoleListRequest(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 添加角色的请求
export function addRoleRequest(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 编辑角色的请求
export function updateRoleRequest(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 删除角色的请求
export function deleteRoleRequest(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
// 角色分配权限请求
export function assignPremRequest(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
// 获取角色详情请求
export function getRoleDetailRequest(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

