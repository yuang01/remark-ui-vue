<template>
  <div id="container">
    <nav-bar />
    <menu-bar />
    <div class="page">
      <tab-bar />
      <div class="page-content">
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import NavBar from '@/views/Layout/Navbar/Navbar';
import MenuBar from '@/views/Layout/Menubar/Menubar';
import TabBar from '@/views/Layout/Tabbar/Tabbar';
import FooterBar from '@/views/Layout/Footer';

export default {
  name: 'app',
  components: {
    NavBar,
    MenuBar,
    TabBar,
    FooterBar,
  },
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  created() {
    // 清楚加载动画
    if (document.getElementById('nb-global-spinner')) {
      document.body.removeChild(document.getElementById('nb-global-spinner'));
    }
  },
};
</script>

<style>
@import 'Base.css';
</style>

<style lang="sass">
@import "./nprogress.css";
</style>
