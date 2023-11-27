import request from '@/utils/request'

// 获取组织列表的请求
export function getUserListRequest(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 导出excel
export function exportExcelRequest() {
  return request({
    url: '/sys/user/export',
    // 因为这个接口后端返回是二进制，不是json字符串，所以需要写个接受类型
    responseType: 'blob' // 这句话就是告诉axios，我们接受后端的数据，使用二进制的方式接收
  })
}
// 导出excel上传模板
export function exportExcelTemplateRequest() {
  return request({
    url: '/sys/user/import/template',
    // 因为这个接口后端返回是二进制，不是json字符串，所以需要写个接受类型
    responseType: 'blob' // 这句话就是告诉axios，我们接受后端的数据，使用二进制的方式接收
  })
}
// 上传excel
export function importExcelRequest(data) {
  return request({
    url: '/sys/user/import',
    method: 'POST',
    // 这个接口是上传的接口，data数据在 点击按钮的还是，上传过来的不是json数据，而是FormData 构造函数的实例对象
    data
  })
}
// 删除员工
export function deleteEmployeeRequest(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 新增员工
export function addEmployeeRequest(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// 获取员工详情
export function getEmployeeDetailRequest(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 修改员工详情
export function updateEmployeeDetailRequest(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
