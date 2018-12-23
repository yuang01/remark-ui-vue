<template>
    <div class="nav-tabs-horizontal bg-blue-grey-100" data-plugin="tabs">
      <el-scrollbar style="width:100%;height:100%;" ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <ul class="nav nav-tabs nav-tabs-line">
          <template v-for="(item, index) in list">
            <li class="nav-item" role="presentation" :key="index" @click="moveToCurrentTag()" @contextmenu.prevent="openMenu($event, item, index)">
              <router-link ref="tag" class="nav-link tab-a"  :class="{'active': $route.fullPath === item.path}" :to="item.path">
                <span class="close animation-scale-up animation-duration-100" @click.stop.prevent="closeTab(index, item.path)">x</span>
                <strong>{{item.title}}</strong>
              </router-link>
            </li>
          </template>
        </ul>
      </el-scrollbar>
      <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click="menuCloseTab()">关闭</li>
        <li @click="closeOthers()">关闭其他</li>
        <li @click="closeAll()">关闭所有</li>
      </ul>
    </div>
</template>

<script>
/* eslint-disable */
const padding = 15
export default {
  computed: {
  },

  data() {
    return {
      list: [],
      visible: false,
      top: 0,
      left: 0,
      selectedTab: {},
    };
  },
  watch: {
    $route() {
      const isExit = this.list.some(item => item.path === this.$route.fullPath);
      if (isExit === false) {
        this.addTab();
      }
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    addTab() {
      const tab = { path: this.$route.path, title: this.$route.meta.title };
      this.list.push(tab);
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      if ($targetLeft > $containerWidth) {
        $scrollWrapper.scrollLeft = $targetLeft - $containerWidth + $targetWidth + padding
      } else {
        $scrollWrapper.scrollLeft = $targetLeft - padding
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.fullPath) {
            this.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    menuCloseTab() {
      const { index, path } = this.selectedTab;
      this.closeTab(index, path);
    },
    closeOthers() {
      this.list = [];
      const { path, title } = this.selectedTab;
      this.list.push({ path, title });
      this.$router.push(path);
    },
    closeAll() {
      this.list = [];
      this.$router.push('/');
    },
    closeTab(index, path) {
      if (this.list.length !== 1) {
        if (path === this.$route.fullPath && index + 1 === this.list.length) {
          const curPath = this.list[index - 1].path;
          this.$router.push(curPath);
          this.list.splice(index, 1);
        } else if (path === this.$route.fullPath && index + 1 !== this.list.length) {
          const curPath = this.list[index + 1].path;
          this.$router.push(curPath);
          this.list.splice(index, 1);
        } else {
          this.list.splice(index, 1);
        }
      }
    },
    openMenu(e, tab, index) {
      this.visible = true;
      this.selectedTab = tab;
      this.selectedTab['index'] = index;
      const menuWidth = document.getElementsByClassName('site-menubar')[0].offsetWidth;
      this.left = e.pageX - menuWidth;
      this.top = e.pageY - 50;
    },
    closeMenu() {
      this.visible = false;
    }
  },
  created() {
    this.addTab();
  },
};
</script>
<style>
.nav-tabs-horizontal .el-scrollbar__wrap {
  overflow-x: visible!important;
}
</style>

<style scoped lang="scss">
.nav {
  height: 44px;
  padding: 0;
  margin: 0;
  display: inline-block;
  white-space: nowrap;
  .nav-item {
    height: 40px;
    display: inline-block;
    a {
      font-size: 14px;
    }
    span {
      font-size: 12px;
      display: block;
      width: 18px;
      line-height: 18px;
      margin-top: 1px;
      padding-bottom: 2px;
      border-radius: 50%;
      text-align: center;
      transform-origin: 100% 50%;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 100;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
.el-scrollbar__wrap {
  overflow-y: hidden;
}
</style>
