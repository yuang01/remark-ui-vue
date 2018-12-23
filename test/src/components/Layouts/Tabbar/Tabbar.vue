<template>
  <div class="nav-tabs-horizontal bg-blue-grey-100" data-plugin="tabs">
    <button type="button" class="btn btn-block btn-default prev" @click="prev($event)">
      <i class="icons wb-chevron-left-mini"></i><i class="icons wb-chevron-left-mini"></i>
    </button>
    <ul class="nav nav-tabs nav-tabs-line">
      <li class="nav-item" role="presentation" v-for="(item, index) in tab.items" :key="index">
        <a
          class="nav-link tab-a"
          :href="item.href"
          :class="{ active : tab.active === item.href }"
          @click.prevent="clickTab(item.href, item.one, item.two, item.twoIndex)"
        >
          <span :class="{ on : tab.active === item.href &&  index > 0}" class="close animation-scale-up animation-duration-100" v-show="tab.items.length > 1" @click.stop.prevent="clickClose(index, item.href)">
            ×
          </span>
          <strong>{{ item.title }}</strong>
        </a>
      </li>
    </ul>
    <button type="button" class="btn btn-block btn-default next" @click="next($event)">
      <i class="icons wb-chevron-right-mini"></i><i class="icons wb-chevron-right-mini"></i>
    </button>
  </div>
</template>

<style scoped>
  .nav-item {
    display: inline-block;
  }
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'menus',
      'tab',
      'tabArr',
      'side',
    ]),
  },

  methods: {
    ...mapActions([
      'pushTab',
      'switchTab',
      'closeTab',
      'activeTab',
      'sliceTab',
      'pushFirstTab',
      'resizeTab',
      'keepChildren',
      'keepDescendant',
    ]),
    clickTab(href, one, two, twoIndex) {
      // 如果该 tab 已经是 active 状态，就 return
      if (href === this.tab.active) {
        return;
      }
      this.switchTab({ href, one, two }); // 将左侧导航的subActive改为one， desActive改为two
      this.keepChildren({ children: this.menus[one].children }); // 左侧导航栏加载当前栏目的children
      if (typeof two !== 'undefined') {
        // 保存三级内容，并且保存三级active，三级active为字符串，通过上一级的title，可能不够唯一性
        this.keepDescendant({
          descendant: this.side.children[twoIndex].children, desActive: two }); // 左侧导航栏加载当前栏目的三级内容
      }
      // 否则让该 tab 变为 active 状态，并且跳转到该路由
      this.$router.replace(`/${href}`);
    },
    clickClose(index, href) {
      // 基于索引值删除 tab
      this.closeTab({ index });

      // 如果此 tab 是 active 状态
      if (href === this.tab.active) {
        this.$router.go(-1);
      }
    },
    prev($event) {
      const target = $event.currentTarget;
      const length = Math.floor(target.parentNode.children[2].offsetLeft / 98);
      const page = this.tab.page - 1;
      const start = [(page - 1) * length] - (page - 1);
      const end = start + length;
      if (this.tab.page === 1) {
        return;
      }
      this.sliceTab({ start, end, page });
    },
    next($event) {
      const length = Math.floor($event.currentTarget.offsetLeft / 98);
      const page = this.tab.page + 1;
      const start = [(page - 1) * length] - (page - 1);
      const end = start + length;
      if (this.tab.tabSum.length <= this.tab.page * length) {
        return;
      }
      this.sliceTab({ start, end, page });
    },
  },

  created() {
    if (this.tab.items.length !== 0) {
      return;
    }
    const tab = {
      href: this.menus[0].href,
      title: this.menus[0].title,
      one: 0,
      two: undefined,
      twoIndex: undefined,
    };
    delete tab.icon;
    this.pushTab({ tab });
  },

  mounted() {
    // 关闭标签的时候，返回上一个标签，此时上一个标签为active状态，当前标签消失
    const path = window.location.href;
    const address = this.$route.path;
    const index = path.indexOf(address);
    let ohref = '';
    if (this.$route.path === '/information') { // 因为Base里面的infomation的href是直接xx?xx,暂时对infomation做特殊处理
      ohref = path.substring(index + 1, path.length);
    } else {
      ohref = address.substring(1);
    }
    this.activeTab({
      href: ohref,
    });

    window.onresize = () => {
      this.resizeTab();
    };
  },
};
</script>

<style scoped>
  .nav-tabs-horizontal {
    position: fixed;
    top: 66px;
    z-index: 1030;
    overflow: hidden;
    width: 100%;
    height: 46px;
  }

  @media (min-width: 1200px) {
    .nav-tabs-horizontal {
      margin-left: 260px;
      width: calc(100% - 260px);
    }
  }
  @media (max-width: 1199px) and (min-width: 768px) {
    .nav-tabs-horizontal {
      margin-left: 90px;
      width: calc(100% - 90px);
    }
  }

  @media (max-width: 768px) {
    .nav-tabs-horizontal {
      margin-left: 0px;
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .site-menubar-unfold .nav-tabs-horizontal {
      margin-left: 130px;
      width: calc(100% - 130px);
    }
  }

  @media (max-width: 767px) {
    .site-menubar-unfold .nav-tabs-horizontal {
      margin-left: 0;
      width: 100%;
    }
  }
/* 控制关闭标签的显示*/
  .close {
    display: none;
  }
  .on {
    display: block !important;
  }
  .nav-item:not(:first-child):hover .close {
    display: block !important;
  }
  /*左右按钮*/
  .prev {
    position: absolute;
    width: 50px;
    height: 100%;
    background-color: #f3f7f9 !important;
    z-index: 10000!important;
    border: 0px;
    border-bottom: 1px solid #e4eaec;
  }
  .nav-tabs {
    width: 2000px;
    position: absolute;
    left: 0;
    margin-left:50px;
    transition: width 5s;
  }
  .nav-tabs li {
    transition: all 5s;
  }
  .next {
    position: absolute;
    right: 0;
    width: 50px;
    height: 46px;
    background-color: #f3f7f9 !important;
    z-index: 10000!important;
    border: 0px;
    border-bottom: 1px solid #e4eaec;
  }
</style>
