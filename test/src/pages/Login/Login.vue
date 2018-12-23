<template>
  <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle login-form-algin">
      <div class="panel" :class="{ 'is-loading': fetchLoading }">
        <div class="panel-body">
          <div class="brand">
            <img class="brand-img" src="~@/assets/images/logo.png" alt="...">
            <h2 class="brand-text font-size-20">湖北进口产品<br>质量信息中心平台</h2>
          </div>
          <form method="post" @submit.prevent="onSubmit">
            <div class="form-group form-material text-left" @click="removeDange()">
              <float-input :placeholder="placeholder.username" v-model.trim="username" :hasColor="hasColor" :required="true"></float-input>
            </div>
            <div class="form-group form-material text-left" @click="removeDange()">
              <float-input :placeholder="placeholder.password" :type="'password'" v-model.trim="password" :hasColor="hasColor" :required="true"></float-input>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg mt-40">登录</button>
          </form>
        </div>
        <div class="panel-loading" v-if="fetchLoading">
          <div class="loader loader-default"></div>
        </div>
      </div>

      <footer class="page-copyright page-copyright-inverse">
        <p>武汉深度网科技有限公司</p>
        <p>© 2018. All RIGHT RESERVED.</p>
      </footer>
    </div>

  </div>
</template>

<script>
import { getToken, verifyToken } from '@/api/ciq';
import Input from '@/components/Input/Input';

export default {

  components: {
    'float-input': Input,
  },

  data() {
    return {
      placeholder: {
        username: '用户名',
        password: '密码',
      },
      username: '',
      password: '',
      hasColor: '',
      fetchLoading: false,
    };
  },

  methods: {
    async onSubmit() {
      this.fetchLoading = true;
      await getToken({ // 验证用户名和密码是否正确
        username: this.username,
        password: this.password,
      }).then((response) => {
        if (response.status === 200) {
          this.fetchLoading = false;
          const redirect = this.$route.query.redirect;
          localStorage.setItem('token', response.data.token);
          if (redirect) {
            this.$router.push(redirect);
          } else {
            this.$router.push('/');
          }
        }
      }).catch(() => {
        this.fetchLoading = false;
        this.hasColor = 'has-danger';
      });
    },

    removeDange() {
      if (this.hasColor === '') {
        return;
      }
      this.hasColor = '';
    },
  },

  async created() {
    const token = localStorage.getItem('token');
    if (token) { // 如果 token 存在
      await verifyToken({
        token,
      }).then((response) => {
        if (response.status === 200) {
          const redirect = this.$route.query.redirect;
          if (redirect) {
            this.$router.push(redirect);
          } else {
            this.$router.push('/');
          }
        }
      }).catch(() => {
      });
    }
    document.body.setAttribute('class', 'page-login-v3 layout-full');
  },
};
</script>

<style scoped>
.login-form-algin {
  position: absolute;
  top:50%;
  left: 50%;
  transform:translate(-50%, -50%);
}
</style>

<style src="./site.css"></style>
<style src="./bootstrap.css"></style>
<style src="./bootstrap-extend.css"></style>
<style src="./login-v3.css"></style>

