/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// initial state
const state = {
  theme: {
    'site-menubar-light': false,
    'navbar-inverse': false,
  },
};

const getters = {
  theme: state => state.theme,
};

// actions
const actions = {
  updateTheme({ commit }, value) {
    commit('UPDATE_THEME', value);
  },
};

// mutations
const mutations = {
  UPDATE_THEME: (state, value) => {
    const theme = {
      'site-menubar-light': value,
      'navbar-inverse': value,
    };
    state.theme = theme;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
