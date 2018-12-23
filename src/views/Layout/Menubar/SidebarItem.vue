<template>
  <ul class="site-menu" :class="{'site-menu-sub': basePath !== ''}">
    <template v-for="(item, index) in list" v-if="!item.hidden">
      <li v-if="item.category" class="site-menu-category" :key="`${index}category`">{{item.category}}</li>
      <li class="site-menu-item"
      :key="`${basePath}${index}`"
      :class="{'active': isActive(item), 'open': isOpen === index && hasChild(item)}"
      @click.stop="clickLink(item, index)">
        <router-link :to="toPath(item)">
          <i v-if="basePath === ''" :class="`site-menu-icon wb-${showLabel(item, 'icon')}`"></i>
          <span class="site-menu-title">{{showLabel(item, 'title')}}</span>
          <span class="site-menu-arrow" v-if="hasChild(item)"></span>
        </router-link>
        <template>
          <sidebar-item 
            v-if="hasChild(item)"
            :list="item.children"
            :base-path="resolveBasePath(item.path)"/>
        </template>
      </li>
    </template>
  </ul>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    list: {
      type: Array,
      default: [],
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: -1,
    };
  },
  watch: {
    $route() {
      this.initOpen();
    },
  },
  methods: {
    showLabel(item, name) {
      window[name] = '';
      if (item.children) {
        if (item.children.length === 1) {
          if (item.children[0].meta[name]) {
            window[name] = item.children[0].meta[name];
          } else {
            window[name] = item.meta[name];
          }
        } else {
          window[name] = item.meta[name];
        }
      } else {
        window[name] = item.meta[name];
      }
      return window[name];
    },
    toPath(item) {
      let path = '';
      if (item.children) {
        if (item.children.length === 1) {
          path = `${item.path}/${item.children[0].path}`;
        } else {
          path = '';
        }
      } else {
        path = `${this.basePath}/${item.path}`;
      }
      return path;
    },
    resole(routePath) {
      if (routePath.indexOf('/') === 0) {
        routePath = routePath.substr(1);
      }
      return routePath;
    },
    resolveBasePath(routePath) {
      routePath = this.resole(routePath);
      return `${this.basePath}/${routePath}`;
    },
    hasChild(item) {
      return item.children && item.children.length > 1;
    },
    clickLink(item, index) {
      if (this.isOpen === index) {
        this.isOpen = -1;
      } else {
        this.isOpen = index;
      }
    },
    isActive(item) {
      return this.toPath(item) === this.$route.path || item.path === this.$route.meta.extends;
    },
    initOpen() {
      this.list.forEach((item, index) => {
        const routePath = this.resole(item.path);
        if (this.$route.path.includes(`${this.basePath}/${routePath}`)) {
          this.isOpen = index;
        }
      });
    },
  },
  created() {
    this.initOpen();
  },
};
</script>

<style scoped>
.site-menu-item:not(.open):hover > .site-menu-sub {
  max-height: 0;
  overflow: hidden;
  padding: 0;
}
.site-menu-item.open > .site-menu-sub {
  max-height: 1000px;
  transition: max-height 1s;
}
.site-menu-item:not(.open) > .site-menu-sub {
  display: block!important;
  transition: max-height .4s;
}
.site-menu-item > .site-menu-sub {
  max-height: 0;
  padding: 0;
  overflow: hidden;
}
</style>
