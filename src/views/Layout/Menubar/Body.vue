<template>
<el-scrollbar wrap-class="scrollbar-wrapper" style="height:calc(100% - 76px);">
  <div class="site-menubar-body">
    <div>
      <div>
        <SidebarItem :list="list" :unique-opened="false"/>
      </div>
    </div>
  </div>
</el-scrollbar>
</template>

<script>
import { constantRouterMap } from '@/router';
import SidebarItem from './SidebarItem';

export default {
  components: {
    SidebarItem,
  },
  data() {
    return {
      list: constantRouterMap,
    };
  },
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
