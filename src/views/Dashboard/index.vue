<template>
  <div>这是首页
    <router-link :to="'nested/menu1/menu1-2/menu1-2-2'">跳转到menu1-2-2页面</router-link>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '首页',
  },
};
</script>
