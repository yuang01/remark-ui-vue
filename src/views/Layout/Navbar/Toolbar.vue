<template>
  <!-- Navbar Toolbar -->
  <ul class="nav navbar-toolbar">
    <li class="nav-item hidden-sm-down">
      <a class="nav-link icon icon-fullscreen" :class="{ 'active': fullScreenActive }" @click="full1">
        <span class="sr-only">Toggle fullscreen</span>
      </a>
    </li>
  </ul>
  <!-- End Navbar Toolbar -->
</template>

<script>
import screenfull from 'screenfull';


export default {
  data() {
    return {
      fullScreenActive: false,
      full: false,
    };
  },

  methods: {
    full1() {
      if (screenfull.enabled) {
        this.fullScreenActive = !this.fullScreenActive;
        screenfull.toggle();
      }
    },
  },
};
</script>
