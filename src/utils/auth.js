// cookie内容:每个cookie都有自己的域名domin,每个cookie都有自己的过期时间
// cookie会随着请求头自动化发送给服务器
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
