import { verifyToken } from '@/api/ciq';

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

const Abs = () => import('@/components/Layouts/Abs');

const Login = () => import('@/pages/Login/Login');

const Dashboard = () => import('@/pages/Dashboard/Dashboard'); // 整体概览

const DashboardFull = () => import('@/pages/Dashboard/DashboardFull'); // 整体概览全屏

const Inspections = () => import('@/pages/Import/Inspections'); // 进口不合格农产品信息

const RiskFood = () => import('@/pages/Import/RiskFood'); // 进境食品风险预警信息

const DefectRecalls = () => import('@/pages/Import/DefectRecalls'); // 缺陷产品召回信息

const Recalls = () => import('@/pages/Import/Recalls'); // 产品召回信息

const Epidemics = () => import('@/pages/Import/Epidemics'); // 疫情信息

const Brands = () => import('@/pages/News/Brands'); // 风险品牌

const ProductView = () => import('@/pages/News/ProductView'); // 产品概览

const BrandDetail = () => import('@/pages/News/BrandDetail'); // 风险品牌详情

const Information = () => import('@/pages/Export/Information'); // 出口风险信息

const ImportRisk = () => import('@/pages/Analysis/ImportRisk'); // 进口风险信息分析

const ExportRisk = () => import('@/pages/Analysis/ExportRisk'); // 出口风险信息分析

const Users = () => import('@/pages/Manage/Users'); // 用户管理

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Abs,
    meta: { requiresAuth: true },
    children: [{
      path: 'dashboard',
      alias: '/',
      component: Dashboard,
    }, {
      path: 'dashboardFull',
      component: DashboardFull,
    }, {
      path: 'inspections',
      component: Inspections,
    }, {
      path: 'riskFood',
      component: RiskFood,
    }, {
      path: 'defectRecalls',
      component: DefectRecalls,
    }, {
      path: 'recalls',
      component: Recalls,
    }, {
      path: 'epidemics',
      component: Epidemics,
    }, {
      path: 'brands',
      component: Brands,
    }, {
      path: 'brands/:id',
      component: BrandDetail,
    }, {
      path: 'productView',
      component: ProductView,
    }, {
      path: 'information',
      component: Information,
    }, {
      path: 'users',
      component: Users,
    }, {
      path: 'importRisk',
      component: ImportRisk,
    }, {
      path: 'exportRisk',
      component: ExportRisk,
    }],
  }, {
    path: '/login',
    component: Login,
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.configure({
    template: "<div class='bar nprogress-bar-success' role='bar'><div class='peg'></div></div><div class='spinner' role='spinner'><div class='spinner-icon'></div></div>",
    minimum: 0.4,
  });
  NProgress.start();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const token = localStorage.getItem('token');

    if (token) { // 如果 token 存在
      await verifyToken({
        token,
      }).then((response) => {
        if (response.status === 200) { // token verify api 200, 正常访问
          next();
        }
      }).catch((error) => {
        if (error.response.status === 400) { // token verify api 400, 强制登录
          next({
            path: '/login',
            query: { redirect: to.fullPath },
          });
        }
      });
    } else { // 如果 token 不存在，强制登录
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
