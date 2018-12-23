<template>
  <div class="navbar-container container-fluid">
    <!-- Navbar Collapse -->
    <div class="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
      <navbar-toolbar></navbar-toolbar>
      <navbar-toolbar-right></navbar-toolbar-right>
    </div>
    <!-- End Navbar Collapse -->
    <navbar-search></navbar-search>
  </div>
</template>

<script>
import Toolbar from './Toolbar';
import ToolbarRight from './ToolbarRight';
import Search from './Search';

export default {
  components: {
    'navbar-toolbar': Toolbar,
    'navbar-toolbar-right': ToolbarRight,
    'navbar-search': Search,
  },
};
</script>
