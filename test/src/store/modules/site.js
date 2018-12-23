/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import * as types from '../mutation-types';

// initial state
const state = {
  site: {},
  theme: {
    'site-menubar-light': true,
    'navbar-inverse': true,
  },
  tab: {
    active: '',
    page: 1,
    start: 0,
    items: [],
    tabSum: [],
  },
  side: {  // 左侧导航栏参数
    subActive: -1,
    children: [],
    descendant: [],
    desActive: '',
    menuActive: '',
  },
};

const getters = {
  site: state => state.site,
  theme: state => state.theme,
  tab: state => state.tab,
  side: state => state.side,
};

// actions
const actions = {
  updateSite({ commit }, { site }) {
    commit(types.UPDATE_SITE, { site });
  },
  updateTheme({ commit }, { value }) {
    commit(types.UPDATE_THEME, { value });
  },
  pushTab({ commit }, { tab }) {
    commit(types.PUSH_TAB, { tab });
  },
  switchTab({ commit }, { href, one, two }) {
    commit(types.SWITCH_TAB, { href, one, two });
  },
  closeTab({ commit }, { index }) {
    commit(types.CLOSE_TAB, { index });
  },
  activeTab({ commit }, { href }) {
    commit(types.ACTIVE_TAB, { href });
  },
  sliceTab({ commit }, { start, end, page }) {
    commit(types.SLICETAB, { start, end, page });
  },
  swichSubActive({ commit }) {
    commit(types.SWICH_SUBACTIVE);
  },
  swichDesActive({ commit }) {
    commit(types.SWICH_DESACTIVE);
  },
  keepSubActive({ commit }, { index }) {
    commit(types.KEEP_SUBACTIVE, { index });
  },
  keepChildren({ commit }, { children }) {
    commit(types.KEEP_CHILDREN, { children });
  },
  keepDescendant({ commit }, { descendant, desActive }) {
    commit(types.KEEP_DESCENDANT, { descendant, desActive });
  },
  addActiveClass({ commit }, { href }) {
    commit(types.ADD_ACTIVECLASS, { href });
  },
  resizeTab({ commit }) {
    commit(types.RESIZE_TAB);
  },
};

// mutations
const mutations = {
  [types.UPDATE_SITE](state, { site }) {
    state.site = site;
  },
  [types.UPDATE_THEME](state, { value }) {
    const theme = {
      'site-menubar-light': value,
      'navbar-inverse': value,
    };
    state.theme = theme;
  },
  [types.PUSH_TAB](state, { tab }) {
    state.tab.active = tab.href;
    state.tab.items.push(tab);
    state.tab.tabSum.push(tab);
  },
  [types.SWITCH_TAB](state, { href, one, two }) {
    state.tab.active = href;
    state.side.menuActive = href;
    state.side.subActive = one;
    state.side.desActive = two;
  },
  [types.CLOSE_TAB](state, { index }) {
    state.tab.items.splice(index, 1);
    state.tab.tabSum.splice(index, 1);
  },
  [types.ACTIVE_TAB](state, { href }) {
    state.tab.active = href;
  },
  [types.SLICETAB](state, { start, end, page }) {
    state.tab.page = page;
    state.tab.items = state.tab.tabSum.slice(start, end);
    state.tab.start = start;
  },
  [types.KEEP_SUBACTIVE](state, { index }) {
    state.side.subActive = index;
  },
  [types.SWICH_SUBACTIVE](state) {
    state.side.subActive = -1;
  },
  [types.SWICH_DESACTIVE](state) {
    state.side.desActive = -1;
  },
  [types.KEEP_CHILDREN](state, { children }) {
    state.side.children = children;
  },
  [types.KEEP_DESCENDANT](state, { descendant, desActive }) {
    state.side.descendant = descendant;
    state.side.desActive = desActive;
  },
  [types.ADD_ACTIVECLASS](state, { href }) {
    state.side.menuActive = href;
  },
  [types.RESIZE_TAB](state) {
    state.tab.items = state.tab.tabSum.slice(state.tab.start);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
