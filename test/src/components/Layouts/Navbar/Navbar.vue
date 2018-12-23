<template>
  <nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" :class="{ 'navbar-inverse': theme['navbar-inverse'] }" role="navigation">
    <navbar-header></navbar-header>
    <navbar-container></navbar-container>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

import Header from './Header';
import Container from './Container';

export default {
  components: {
    'navbar-header': Header,
    'navbar-container': Container,
  },

  computed: {
    ...mapGetters([
      'theme',
    ]),
  },
};
</script>
