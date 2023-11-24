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
