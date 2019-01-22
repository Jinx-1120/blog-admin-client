/*
 * @Author: jhd
 * @Date: 2019-01-14 11:25:08
 * @Description: fouter file
 */
import Vue from 'vue'
import Router, { RouteConfig, Route, RawLocation } from 'vue-router'

Vue.use(Router)

const routers: RouteConfig[] = [
  {
    path: '/das',
    redirect: {
      name: '首页'
    },
    meta: { leaf: true, icon: 'icon-home', show: true},
    component: () => import(/* webpackChunkName: "index" */ './layout/index.vue'),
    children: [
      {
        path: '/home',
        component: () => import(/* webpackChunkName: "about" */ './views/Article.vue'),
        name: '首页',
        meta: { requireAuth: true, leaf: false, show: true }
      },
      {
        path: '/about',
        name: 'about',
        meta: { leaf: false, show: true },
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    ]
  },
  {
    path: '/about',
    name: '日志',
    meta: { leaf: false, icon: 'icon-log', show: true },
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { leaf: false, show: false },
    component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
  }
]
const router: Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers
})
router.beforeEach((to: Route, from: Route, next: any): void => {
  if (to.fullPath === '/') {
    next({
      path: '/home'
    })
  }
  next()
})
export default router
