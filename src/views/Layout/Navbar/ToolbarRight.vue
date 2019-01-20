<template>
  <!-- Navbar Toolbar Right -->
  <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
    <li class="nav-item dropdown">
      <a class="nav-link navbar-avatar" @click="active.user = !active.user" @blur="active.user = false" href="javascript:;" data-animation="scale-up">
        <span class="avatar avatar-online">
          <img src="" alt="...">
          <i></i>
        </span>
      </a>
      <div class="deopUser animation-scale-up animation-duration-100" role="menu" v-show="active.user" @mousedown="peventBlur($event)">
        <router-link class="dropdown-item" to="users" role="menuitem">
          <i class="icon wb-user" aria-hidden="true"></i> 用户管理
        </router-link>
        <div class="dropdown-divider" role="presentation"></div>
        <a class="dropdown-item" href="javascript:;"  @click="loginOut()" role="menuitem">
          <i class="icon wb-power" aria-hidden="true"></i> 登出
        </a>
      </div>
    </li>
  </ul>
  <!-- End Navbar Toolbar Right -->
</template>

<script>
export default {
  data() {
    return {
      active: {
        user: false,
        notice: false,
        news: false,
      },
    };
  },
  methods: {
    peventBlur($event) {
      $event.preventDefault();
    },
    loginOut() {
      localStorage.removeItem('token');
      this.$router.replace('/login');
    },
  },
};
</script>

<style scoped>
.deopUser {
  position: absolute;
  top: 100%;
  right: 0%;
  z-index: 9999999;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 5px 0 0;
  font-size: 1rem;
  color: #76838f;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e4eaec;
  border-radius: .215rem;
  -webkit-box-shadow: 0 3px 12px rgba(0, 0, 0, .05);
  box-shadow: 0 3px 12px rgba(0, 0, 0, .05);
}
.dropdown {
  position: relative;
}
</style>


