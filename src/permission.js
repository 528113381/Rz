import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken } from './utils/auth'
import { profileRequest } from './api/user'
import store from './store'

const whiteList = ['/login']

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  const token = getToken()
  // 虚拟进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // 有 token 放行
  if (token) {
    NProgress.done()
    if (to.path === '/login') {
      next('/')
    } else {
      const res = await profileRequest()
      store.commit('user/setUserInfoMutation', res.data)
      console.log(res)
      next()
    }
    return
  }
  if (whiteList.includes(to.path)) {
    next()
    NProgress.done()
    return
  }
  next('/login')
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
