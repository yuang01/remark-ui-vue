<template>
  <div class="site-menubar" :class="{ 'site-menubar-light': theme['site-menubar-light'] }">
    <site-menubar-body></site-menubar-body>
    <site-menubar-footer></site-menubar-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Body from './Body';
import Footer from './Footer';

export default {
  components: {
    'site-menubar-body': Body,
    'site-menubar-footer': Footer,
  },

  computed: {
    ...mapGetters([
      'theme',
    ]),
  },
};
</script>
