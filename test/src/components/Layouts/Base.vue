<template>
  <div id="container">
    <site-navbar></site-navbar>
    <site-menubar v-if="showMenubar"></site-menubar>
    <site-tabbar v-if="showTabbar"></site-tabbar>
    <div class="page">
      <slot name="aside"></slot>
      <slot name="content"></slot>
    </div>
    <site-footer v-if="showFooter"></site-footer>
    <slot name="modal"></slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

const Navbar = () => import('@/components/Layouts/Navbar/Navbar');
const Menubar = () => import('@/components/Layouts/Menubar/Menubar');
const Footer = () => import('@/components/Layouts/Footer');
const Tabbar = () => import('@/components/Layouts/Tabbar/Tabbar');

export default {
  name: 'remark',

  props: {
    showMenubar: {
      default: true,
    },
    showTabbar: {
      default: true,
    },
    showFooter: {
      default: true,
    },
  },

  components: {
    'site-tabbar': Tabbar,
    'site-navbar': Navbar,
    'site-menubar': Menubar,
    'site-footer': Footer,
  },
  methods: {
    ...mapActions([
      'updateSite',
      'updateMenu',
    ]),
  },

  created() {
    document.body.removeAttribute('class');
    this.updateSite({
      site: {
        name: '湖北进口产品质量信息中心平台',
      },
    });
    this.updateMenu({
      menus: [{
        icon: 'dashboard',
        title: '整体概览',
        href: 'dashboard',
        index: { one: 0, two: undefined, twoIndex: undefined },
      }, {
        icon: 'globe',
        title: '进口风险信息',
        index: { one: 1, two: undefined, twoIndex: undefined },
        children: [{
          title: '进口不合格农产品信息',
          href: 'inspections',
          index: { one: 1, two: undefined, twoIndex: undefined },
        }, {
          title: '进境食品/化妆品风险预警信息',
          href: 'riskFood',
          index: { one: 1, two: undefined, twoIndex: undefined },
        }, {
          title: '缺陷产品召回信息',
          href: 'defectRecalls',
          index: { one: 1, two: undefined, twoIndex: undefined },
        }, {
          title: '产品召回信息',
          href: 'recalls',
          index: { one: 1, two: undefined, twoIndex: undefined },
        }, {
          title: '疫情信息',
          href: 'epidemics',
          index: { one: 1, two: undefined, twoIndex: undefined },
        }],
      }, {
        icon: 'paper-plane',
        title: '出口风险信息',
        index: { one: 2, two: undefined, twoIndex: undefined },
        children: [{
          title: 'TBT',
          href: 'information?category=tbt',
          index: { one: 2, two: undefined, twoIndex: undefined },
        }, {
          title: 'SPS',
          href: 'information?category=sps',
          index: { one: 2, two: undefined, twoIndex: undefined },
        }, {
          title: '召回信息',
          href: 'information?category=recall',
          index: { one: 2, two: undefined, twoIndex: undefined },
        }, {
          title: '风险信息',
          href: 'information?category=warning',
          index: { one: 2, two: undefined, twoIndex: undefined },
        }],
      }, {
        icon: 'plane',
        title: '跨境电商风险信息',
        index: { one: 3, two: undefined, twoIndex: undefined },
        children: [{
          title: '产品概览',
          href: 'productView',
          index: { one: 3, two: undefined, twoIndex: undefined },
        }, {
          title: '品牌列表',
          href: 'brands',
          index: { one: 3, two: undefined, twoIndex: undefined },
        }],
      }, {
        icon: 'pie-chart',
        title: '数据统计与分析',
        index: { one: 4, two: undefined, twoIndex: undefined },
        children: [{
          title: '进口风险信息分析',
          href: 'importRisk',
          index: { one: 4, two: undefined, twoIndex: undefined },
        }, {
          title: '出口风险信息分析',
          href: 'exportRisk',
          index: { one: 4, two: undefined, twoIndex: undefined },
        }],
      }, {
        icon: 'cog',
        title: '系统管理',
        index: { one: 5, two: undefined, twoIndex: undefined },
        children: [{
          title: '用户管理',
          href: 'users',
          index: { one: 5, two: undefined, twoIndex: undefined },
        }],
      }],
    });
  },
};
</script>

<style scoped>
#container {
  height: 100%;
}
.row {
  margin-left: -10px;
  margin-right: -10px;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.col,
.col-auto,
.col-sm-1,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm,
.col-sm-auto,
.col-md-1,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md,
.col-md-auto,
.col-lg-1,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg,
.col-lg-auto,
.col-xl-1,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl,
.col-xl-auto,
.col-xxl-1,
.col-xxl-2,
.col-xxl-3,
.col-xxl-4,
.col-xxl-5,
.col-xxl-6,
.col-xxl-7,
.col-xxl-8,
.col-xxl-9,
.col-xxl-10,
.col-xxl-11,
.col-xxl-12,
.col-xxl,
.col-xxl-auto {
  padding-left: 10px;
  padding-right: 10px;
}
.col-md-3,
.col-sm-6 {
  margin-bottom: 20px;
}
.page-content {
  padding: 20px;
  padding-top: 66px;
  padding-bottom: 0;
}

.panel {
  margin-bottom: 20px;
  overflow: auto;
}

/* 清除浮动 */
.clear {
  clear: both;
}

.panel-title {
  padding: 15px 20px;
  font-size: 14px;
}

.panel-body {
  padding: 5px 20px;
  position: relative;
}

.card {
  margin-bottom: 20px;
}

ul li {
  margin-bottom: 20px;
}

.table-custom th,
.table-custom td {
  max-width: 500px;
  min-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.table-custom a {
  text-decoration: none;
}
.form-material.floating {
  margin: 0 !important;
}
.form-material .form-control {
  background-size: 0 2px,100% 1px;
  background-image: linear-gradient(#3e8ef7,#3e8ef7),linear-gradient(#CCD5DB,#CCD5DB);
}
.page-animation {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 4;
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%);
  color: #f1f4f5 !important;
}
</style>
<style src="@/assets/remark/global/css/bootstrap.css"></style>
<style src="@/assets/remark/global/css/bootstrap-extend.css"></style>
<style src="@/assets/remark/base/css/site.css"></style>
<style src="@/assets/remark/global/fonts/web-icons/web-icons.css"></style>
<style src="@/assets/remark/global/fonts/brand-icons/brand-icons.css"></style>
<style src="@/assets/remark/global/fonts/font-awesome/font-awesome.css"></style>
<style src="@/assets/remark/global/fonts/flag-icon-css/flag-icon.css"></style>
<style lang="sass">
@import "./nprogress.css";
</style>
