// import { verifyToken } from '@/api/ciq';

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import Meta from 'vue-meta';

import Layout from '@/views/Layout/Layout';

const Login = () => import('@/views/Login/Login');
const Dashboard = () => import('@/views/Dashboard/index'); // 整体概览
const ExpertViews = () => import('@/views/ExpertViews/index'); // 专家视点
const Hotspots = () => import('@/views/Hotspots/index'); // 质监热点
const RiskNews = () => import('@/views/RiskNews/index'); // 风险快讯
const SamplingInfo = () => import('@/views/SamplingInfo/index'); // 风险快讯
const BusinessInfo = () => import('@/views/BusinessInfo/index'); // 业务信息
const Search = () => import('@/views/Search/index'); // 全文检索

Vue.use(Router);
Vue.use(Meta);


export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    category: '业务',
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: { icon: 'dashboard', title: '首页' },
      },
    ],
  },
  {
    path: '/hotspots',
    component: Layout,
    redirect: '/hotspots/index',
    children: [
      {
        path: 'index',
        component: Hotspots,
        name: 'Hotspots',
        meta: { icon: 'inbox', title: '热点信息' },
      },
    ],
  },
  {
    path: '/expertviews',
    component: Layout,
    redirect: '/expertviews/index',
    children: [
      {
        path: 'index',
        component: ExpertViews,
        name: 'ExpertViews',
        meta: { icon: 'user', title: '专家视点' },
      },
    ],
  },
  {
    path: '/risknews',
    component: Layout,
    redirect: '/risknews/index',
    children: [
      {
        path: 'index',
        component: RiskNews,
        name: 'RiskNews',
        meta: { icon: 'library', title: '风险快讯' },
      },
    ],
  },
  {
    path: '/samplinginfo',
    component: Layout,
    redirect: '/samplinginfo/index',
    children: [
      {
        path: 'index',
        component: SamplingInfo,
        name: 'SamplingInfo',
        meta: { icon: 'hammer', title: '抽检信息' },
      },
    ],
  },
  {
    path: '/businessinfo',
    component: Layout,
    redirect: '/businessinfo/index',
    children: [
      {
        path: 'index',
        component: BusinessInfo,
        name: 'BusinessInfo',
        meta: { title: '业务信息', icon: 'list-bulleted' },
      },
    ],
  },
  {
    path: '/nested',
    component: Layout,
    name: 'nested',
    redirect: '/nested/test',
    meta: { title: 'nested', icon: 'dashboard' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index'),
            name: 'menu1-1',
            meta: { title: 'menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'menu1-2-2',
                meta: { title: 'menu1-2-2' },
              },
              {
                path: 'edit',
                component: () => import('@/views/nested/menu1/menu1-2/edit'),
                name: 'edit',
                meta: { title: 'edit', extends: 'menu1-2-2' },
                hidden: true,
              },
            ],
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'menu2',
        meta: { title: 'menu2' },
      },
      {
        path: 'test',
        component: () => import('@/views/nested/test/index'),
        name: 'test',
        meta: { title: 'test' },
      },
    ],
  },
  {
    path: '/search',
    component: Layout,
    redirect: '/search/index',
    children: [
      {
        path: 'index',
        component: Search,
        name: 'Search',
        meta: { icon: 'search', title: '全文检索' },
      },
    ],
  },
];
const router = new Router({
  mode: 'history',
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 }),
});

router.beforeEach(async (to, from, next) => {
  NProgress.configure({
    template: "<div class='bar nprogress-bar-primary nprogress-bar-header' role='bar'><div class='peg'></div></div><div class='spinner' role='spinner'><div class='spinner-icon'></div></div>",
    minimum: 0.4,
  });
  NProgress.start();
  next();
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   const token = localStorage.getItem('token');

  //   if (token) { // 如果 token 存在
  //     const payload = token.split('.')[1]; // 取出token第二个分段
  //     const payloadDict = new Buffer(payload, 'base64').toString(); // 然后解析
  //     const overdueTime = JSON.parse(payloadDict).exp * 1000; // 提取exp（过期时间）
  //     const curTime = new Date().getTime(); // 获取当前时间
  //     if (curTime <= overdueTime) { // 如果当前时间小于过期时间，就是允许的
  //       next();
  //     } else { // 如果当前时间大于过期时间，强制登录
  //       next({
  //         path: '/login',
  //         query: { redirect: to.fullPath },
  //       });
  //     }
  //   } else { // 如果 token 不存在，强制登录
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath },
  //     });
  //   }
  // } else {
  //   next(); // 确保一定要调用 next()
  // }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
