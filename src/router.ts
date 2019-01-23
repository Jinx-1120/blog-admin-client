/*
 * @Author: jhd
 * @Date: 2019-01-14 11:25:08
 * @Description: fouter file
 */
import Vue from 'vue'
import Router, { RouteConfig, Route, RawLocation } from 'vue-router'
Vue.use(Router)

const Release = () => import(/* webpackChunkName: "release" */ './views/article/Release.vue')
const Layout = () => import(/* webpackChunkName: "index" */ './layout/index.vue')
const Article = () => import(/* webpackChunkName: "home" */ './views/article/Article.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/login.vue')
const Tag = () => import(/*webpackChunkName: "tag" */ './views/tag/tags.vue')
const routers: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    meta: { leaf: false, icon: 'icon-home', show: true},
    component: Layout,
    children: [
      {
        path: '/home',
        component: Tag,
        name: '标签管理',
        meta: { requireAuth: true, leaf: false, show: false }
      }
    ]
  },
  {
    path: '/',
    name: '文章管理',
    meta: { leaf: true, icon: 'icon-log', show: true },
    component: Layout,
    children: [
      {
        path: '/article',
        component: Article,
        name: '文章列表',
        meta: { requireAuth: true, leaf: false, show: true }
      },
      {
        path: '/article/release',
        component: Release,
        name: '文章',
        meta: { requireAuth: true, leaf: false, show: false }
      }
    ]
  },
  {
    path: '/tag',
    name: '标签管理',
    meta: { leaf: false, show: true },
    component: Layout,
    children: [
      {
        path: '/tag',
        component: Tag,
        name: '标签管理',
        meta: { requireAuth: true, leaf: false, show: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { leaf: false, show: false },
    component: Login
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
