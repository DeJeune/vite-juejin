import { createStore } from 'vuex';
import * as actions from './actions.js';
import state from './state.js';
import mutations from './mutations.js';
import getters from './getters.js';
export default createStore({
  state,
  getters,
  actions,
  mutations
});
