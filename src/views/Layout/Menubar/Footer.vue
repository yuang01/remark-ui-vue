<template>
  <div class="site-menubar-footer">
    <a href="javascript:void(0)">
      <span class="icon wb-eye" aria-hidden="true"></span>
    </a>
    <a @click="switchTheme">
      <span class="icon wb-library" aria-hidden="true"></span>
    </a>
    <a @click="loginOut()">
      <span class="icon wb-power" aria-hidden="true"></span>
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      themeMode: 0,
    };
  },

  methods: {
    ...mapActions([
      'updateTheme',
    ]),

    switchTheme() {
      if (this.themeMode === 0) {
        this.themeMode = 1;
        this.updateTheme({ value: true });
      } else {
        this.themeMode = 0;
        this.updateTheme({ value: false });
      }
    },

    loginOut() {
      localStorage.removeItem('token');
      this.$router.replace('/login');
    },
  },
};
</script>
