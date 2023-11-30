import { loginRequest } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'
export default {
  namespaced: true, // 命名空间
  state: {
    token: getToken || '',
    userInfo: {},
    routes: constantRoutes
  },
  mutations: {
    loginMutation(state, payload) {
      state.token = payload
      setToken(payload)
    },
    setUserInfoMutation(state, payload) {
      state.userInfo = payload
    },
    delTokenMutation(state) {
      state.token = ''
      state.userInfo = {}
      // setToken('')
      removeToken()
      resetRouter()
    },
    setRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    }
  },
  actions: {
    async loginAction(context, payload) {
      const { data } = await loginRequest(payload)
      context.commit('loginMutation', data)
      return Promise.resolve(true)
    }
  }
}
