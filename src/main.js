import '@/assets/remark/base/css/site.css';
import '@/assets/remark/global/css/bootstrap-extend.css';
// grenn.css是主题色，可以从@/assets/remark/base/css/skins下选择想要的主题色, 默认蓝色
// import '@/assets/remark/base/skins/green.css';
import '@/assets/remark/global/fonts/web-icons/web-icons.css';
import { DatePicker, Select, Option, Tag, Scrollbar } from 'element-ui';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

// element采用按需引入
Vue.component('el-date-picker', DatePicker);
Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-tag', Tag);
Vue.component('el-scrollbar', Scrollbar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
