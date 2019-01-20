
import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import Meta from 'vue-meta';

import Layout from '@/views/Layout/Layout';

const Login = () => import('@/views/Login/Login');
const Dashboard = () => import('@/views/Dashboard/index');
const advancedUi = () => import('@/views/advancedUi/index');
const basicUi = () => import('@/views/basicUi/index');
const structure = () => import('@/views/structure/index');
const widgets = () => import('@/views/widgets/index');
const forms = () => import('@/views/forms/index');
const Search = () => import('@/views/Search/index');

Vue.use(Router);
Vue.use(Meta);


export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    // hidden: true,
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
    path: '/basicUi',
    component: Layout,
    redirect: '/basicUi/index',
    children: [
      {
        path: 'index',
        component: basicUi,
        name: 'basicUi',
        meta: { icon: 'inbox', title: 'Basic UI' },
      },
    ],
  },
  {
    path: '/advancedUi',
    component: Layout,
    redirect: '/advancedUi/index',
    children: [
      {
        path: 'index',
        component: advancedUi,
        name: 'advancedUi',
        meta: { icon: 'user', title: 'Advanced UI' },
      },
    ],
  },
  {
    path: '/structure',
    component: Layout,
    redirect: '/structure/index',
    children: [
      {
        path: 'index',
        component: structure,
        name: 'structure',
        meta: { icon: 'library', title: 'structure' },
      },
    ],
  },
  {
    path: '/widgets',
    component: Layout,
    redirect: '/widgets/index',
    children: [
      {
        path: 'index',
        component: widgets,
        name: 'widgets',
        meta: { icon: 'hammer', title: 'widgets' },
      },
    ],
  },
  {
    path: '/forms',
    component: Layout,
    redirect: '/forms/index',
    children: [
      {
        path: 'index',
        component: forms,
        name: 'forms',
        meta: { title: 'forms', icon: 'list-bulleted' },
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

router.beforeEach((to, from, next) => {
  NProgress.configure({
    template: "<div class='bar nprogress-bar-primary nprogress-bar-header' role='bar'><div class='peg'></div></div><div class='spinner' role='spinner'><div class='spinner-icon'></div></div>",
    minimum: 0.4,
  });
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
