import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _455eed51 = () => interopDefault(import('..\\pages\\articles\\index.vue' /* webpackChunkName: "pages/articles/index" */))
const _2f6fe4df = () => interopDefault(import('..\\pages\\articles\\new.vue' /* webpackChunkName: "pages/articles/new" */))
const _17b873c6 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _46a22ad8 = () => interopDefault(import('..\\pages\\auth\\signup.vue' /* webpackChunkName: "pages/auth/signup" */))
const _1bba0ff9 = () => interopDefault(import('..\\pages\\articles\\_id.vue' /* webpackChunkName: "pages/articles/_id" */))
const _16a32eee = () => interopDefault(import('..\\pages\\auth\\_id.vue' /* webpackChunkName: "pages/auth/_id" */))
const _40a3182e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/articles",
    component: _455eed51,
    name: "articles"
  }, {
    path: "/articles/new",
    component: _2f6fe4df,
    name: "articles-new"
  }, {
    path: "/auth/login",
    component: _17b873c6,
    name: "auth-login"
  }, {
    path: "/auth/signup",
    component: _46a22ad8,
    name: "auth-signup"
  }, {
    path: "/articles/:id",
    component: _1bba0ff9,
    name: "articles-id"
  }, {
    path: "/auth/:id?",
    component: _16a32eee,
    name: "auth-id"
  }, {
    path: "/",
    component: _40a3182e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
