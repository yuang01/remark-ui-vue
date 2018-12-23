<template>
  <div class="site-menubar-body">
    <div>
      <div>
        <site-menu></site-menu>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';

export default {
  components: {
    'site-menu': Menu,
  },
};
</script>
<style scoped>
  .site-menubar-body {
    overflow-y: auto;
  }
  .site-menubar-body::-webkit-scrollbar {
    display:none;
  }
  .site-menubar-body {
   -ms-overflow-style: none;
  }
</style>
