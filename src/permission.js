import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // 虚拟进度条
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
