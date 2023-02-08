import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4b6a310b = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _381b8ffc = () => interopDefault(import('../pages/auth/_token.vue' /* webpackChunkName: "pages/auth/_token" */))
const _63b1868d = () => interopDefault(import('../pages/g/_id.vue' /* webpackChunkName: "pages/g/_id" */))
const _08597b5a = () => interopDefault(import('../pages/request/_.vue' /* webpackChunkName: "pages/request/_" */))
const _1f6a0b4d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _4b6a310b,
    name: "about"
  }, {
    path: "/auth/:token?",
    component: _381b8ffc,
    name: "auth-token"
  }, {
    path: "/g/:id?",
    component: _63b1868d,
    name: "g-id"
  }, {
    path: "/request/*",
    component: _08597b5a,
    name: "request-all"
  }, {
    path: "/",
    component: _1f6a0b4d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
