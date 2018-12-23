<template>
  <div class="navbar-header">
    <button type="button" class="navbar-toggler hamburger hamburger-close navbar-toggler-left hided" data-toggle="menubar">
      <span class="sr-only">Toggle navigation</span>
      <span class="hamburger-bar"></span>
    </button>
    <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-collapse" data-toggle="collapse">
      <i class="icon wb-more-horizontal" aria-hidden="true"></i>
    </button>
    <div class="navbar-brand navbar-brand-center">
      <span style="font-size: 26px;" alt="放图片">logo</span>
      <!-- <img class="navbar-brand-logo" src="~@/assets/images/logo.png" srcset="~@/assets/images/logo@2x.png 2x" title="Remark"> -->
    </div>
    <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-search" data-toggle="collapse">
      <span class="sr-only">Toggle Search</span>
      <i class="icon wb-search" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'site',
    ]),
  },
};
</script>
