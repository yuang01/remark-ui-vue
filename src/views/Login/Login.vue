<template>
<div class="animsition page-login-v2 layout-full page-dark" ref="pageLogin">
  <div class="page" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content">
      <div class="page-brand-info">
        <div class="brand">
          <img class="brand-img" src="~@/assets/images/login.png" srcset="~@/assets/images/login@2x.png 2x" alt="...">
        </div>
      </div>
      <div class="page-login-main animation-slide-right animation-duration-1" ref="pageForm">
        <div class="brand hidden-md-up">
        </div>
        <h3 class="font-size-24" style="color: #fff">登录</h3>
        <form method="post" @submit.prevent="onSubmit">
          <div class="form-group">
            <label class="sr-only" for="inputEmail">用户名</label>
            <input type="text" class="form-control" :class="{ has_color : hasDanger }" @focus="onFocus()" id="inputUser" name="email" v-model.trim="username" placeholder="用户名" required="required">
          </div>
          <div class="form-group">
            <label class="sr-only" for="inputPassword">密码</label>
            <input type="password" class="form-control" :class="{ has_color : hasDanger }" @focus="onFocus()" id="inputPassword" name="password" v-model.trim="password" placeholder="密码" required="required">
          </div>
          <el-button type="primary" native-type="submit" :style="{width: '100%'}" :loading="fetchLoading">登录</el-button>
        </form>
        <footer class="page-copyright">
        <p>XXXXX科技有限公司</p>
        <p>© 2018. All RIGHT RESERVED.</p>
      </footer>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Button } from 'element-ui';
// import { getToken, verifyToken } from '@/api/ciq';

export default {

  components: {
    'el-button': Button,
  },

  data() {
    return {
      placeholder: {
        username: '用户名',
        password: '密码',
      },
      show: true,
      username: '',
      password: '',
      hasDanger: false,
      fetchLoading: false,
    };
  },

  metaInfo: {
    title: '登录',
  },

  // methods: {
  //   async onSubmit() {
  //     this.fetchLoading = true;
  //     await getToken({ // 验证用户名和密码是否正确
  //       username: this.username,
  //       password: this.password,
  //     }).then((response) => {
  //       if (response.status === 200) {
  //         this.fetchLoading = false;
  //         const redirect = this.$route.query.redirect;
  //         localStorage.setItem('token', response.data.token);
  //         if (redirect) {
  //           this.$router.push(redirect);
  //         } else {
  //           this.$router.push('/');
  //         }
  //       }
  //     }).catch(() => {
  //       this.fetchLoading = false;
  //       this.hasDanger = true;
  //     });
  //   },

  //   onFocus() {
  //     this.hasDanger = false;
  //   },
  // },

  // async created() {
  //   const token = localStorage.getItem('token');
  //   if (token) { // 如果 token 存在
  //     await verifyToken({
  //       token,
  //     }).then((response) => {
  //       if (response.status === 200) {
  //         const redirect = this.$route.query.redirect;
  //         if (redirect) {
  //           this.$router.push(redirect);
  //         } else {
  //           this.$router.push('/');
  //         }
  //       }
  //     }).catch(() => {
  //     });
  //   }
  //   document.body.setAttribute('class', 'p-0');
  //   if (document.getElementById('nb-global-spinner')) {
  //     document.body.removeChild(document.getElementById('nb-global-spinner'));
  //   }
  // },
  created() {
    // 清楚加载动画
    if (document.getElementById('nb-global-spinner')) {
      document.body.removeChild(document.getElementById('nb-global-spinner'));
    }
  },
  beforeDestroy() {
    document.body.removeAttribute('class', 'p-0');
  },

};
</script>
<style scoped>
  .el-button--primary {
    color: #fff;
    background-color: #11c26d;
    border-color: #11c26d;
  }
  .has_color {
    border-color: red;
  }
  .page-copyright p {
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    .brand-img {
      display: none;
    }
  }
</style>
<style src="./login-v2.css" scoped></style>
