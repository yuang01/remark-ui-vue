/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import * as types from '../mutation-types';

// initial state
const state = {
  menus: [],
};

const getters = {
  menus: state => state.menus,
};

// actions
const actions = {
  updateMenu({ commit }, { menus }) {
    commit(types.UPDATE_MENU, { menus });
  },
};

// mutations
const mutations = {
  [types.UPDATE_MENU](state, { menus }) {
    state.menus = menus;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
