import request from '@/utils/request'

// 获取权限点列表接口
export function getPermissionListRequest() {
  return request({
    url: '/sys/permission'
  })
}
// 获取权限点列表接口
export function addPermissionRequest(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
// 删除权限点列表接口
export function deletePermissionRequest(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

// 获取权限点详情接口
export function getPermissionDetailRequest(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}

// 更新权限点详情接口
export function updatePermissionDetailRequest(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

