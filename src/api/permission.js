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
