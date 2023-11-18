import { loginRequest } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
export default {
  namespaced: true, // 命名空间
  state: {
    token: getToken || '',
    userInfo: {}
  },
  mutations: {
    loginMutation(state, payload) {
      state.token = payload
      setToken(payload)
    },
    setUserInfoMutation(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async loginAction(context, payload) {
      console.log(payload, 222)
      const { data } = await loginRequest(payload)
      context.commit('loginMutation', data)
      return Promise.resolve(true)
    }

  }
}
