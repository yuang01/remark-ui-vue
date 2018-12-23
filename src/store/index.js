import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import site from './modules/site';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    site,
  },
  getters,
  strict: debug,
});

export default store;
